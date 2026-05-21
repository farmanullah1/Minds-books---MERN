/**
 * CodeDNA
 * notificationController.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const Notification = require('../models/Notification');
const PushSubscription = require('../models/PushSubscription');

let webPush = null;
try {
  webPush = require('web-push');
} catch (error) {
  webPush = null;
}

const hasVapidConfig = () => Boolean(
  process.env.VAPID_PUBLIC_KEY &&
  process.env.VAPID_PRIVATE_KEY &&
  process.env.VAPID_SUBJECT
);

if (webPush && hasVapidConfig()) {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .populate('fromUser', 'name profilePicture')
      .populate('post', 'content')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (error) {
    console.error('GetNotifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Not found' });
    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('MarkAsRead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('MarkAllAsRead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getVapidPublicKey = async (req, res) => {
  res.json({
    publicKey: process.env.VAPID_PUBLIC_KEY || '',
    enabled: Boolean(webPush && hasVapidConfig()),
  });
};

const savePushSubscription = async (req, res) => {
  try {
    const { endpoint, keys } = req.body || {};
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({ message: 'Invalid push subscription' });
    }

    const subscription = await PushSubscription.findOneAndUpdate(
      { endpoint },
      {
        user: req.user.id,
        endpoint,
        keys,
        userAgent: req.get('user-agent') || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: 'Push subscription saved', subscriptionId: subscription._id });
  } catch (error) {
    console.error('SavePushSubscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePushSubscription = async (req, res) => {
  try {
    const { endpoint } = req.body || {};
    if (!endpoint) {
      return res.status(400).json({ message: 'Endpoint is required' });
    }

    await PushSubscription.deleteOne({ user: req.user.id, endpoint });
    res.json({ message: 'Push subscription removed' });
  } catch (error) {
    console.error('DeletePushSubscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendWebPushNotification = async (userId, notification) => {
  if (!webPush || !hasVapidConfig()) return;

  const subscriptions = await PushSubscription.find({ user: userId });
  if (subscriptions.length === 0) return;

  const title = 'MindBook notification';
  const fromName = notification.fromUser?.name || 'Someone';
  const body = notification.text || `${fromName} interacted with you`;
  const payload = JSON.stringify({
    title,
    body,
    icon: notification.fromUser?.profilePicture || '/icons/icon-192x192.png',
    url: notification.targetUrl || '/notifications',
  });

  await Promise.allSettled(
    subscriptions.map(async (subscription) => {
      try {
        await webPush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          payload
        );
      } catch (error) {
        if (error.statusCode === 404 || error.statusCode === 410) {
          await PushSubscription.deleteOne({ _id: subscription._id });
        } else {
          console.error('WebPush send error:', error.message);
        }
      }
    })
  );
};

const normalizeCreateArgs = (args) => {
  const maybeIo = args[0];
  const hasIo = maybeIo && typeof maybeIo.to === 'function';

  if (hasIo) {
    return {
      io: maybeIo,
      userId: args[1],
      fromUserId: args[2],
      type: args[3],
      postId: args[4] || null,
      text: args[5] || '',
      options: args[6] || {},
    };
  }

  return {
    io: null,
    userId: args[0],
    fromUserId: args[1],
    type: args[2],
    postId: args[3] || null,
    text: args[4] || '',
    options: args[5] || {},
  };
};

// Helper function to create notifications internally
const createNotification = async (...args) => {
  const { io, userId, fromUserId, type, postId, text, options } = normalizeCreateArgs(args);
  if (!userId || !fromUserId || !type) return;
  if (userId.toString() === fromUserId.toString()) return; // Don't notify self
  try {
    const notification = await Notification.create({
      user: userId,
      fromUser: fromUserId,
      type,
      post: postId,
      text,
      targetUrl: options.targetUrl || '',
      metadata: options.metadata || {},
    });

    // Populate fromUser for the frontend
    const populatedNotif = await notification.populate('fromUser', 'name profilePicture');

    if (io) {
      io.to(userId.toString()).emit('notification-received', populatedNotif);
      io.to(`user:${userId.toString()}`).emit('notification-received', populatedNotif);
    }

    await sendWebPushNotification(userId, populatedNotif);
  } catch (error) {
    console.error('CreateNotification internal error:', error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getVapidPublicKey,
  savePushSubscription,
  deletePushSubscription,
  createNotification
};
