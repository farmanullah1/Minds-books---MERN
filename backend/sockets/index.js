const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const userSocketMap = new Map();
const socketUserMap = new Map();

function addSocket(userId, socketId) {
  const key = userId.toString();
  if (!userSocketMap.has(key)) userSocketMap.set(key, new Set());
  userSocketMap.get(key).add(socketId);
  socketUserMap.set(socketId, key);
}

function removeSocket(socketId) {
  const userId = socketUserMap.get(socketId);
  if (!userId) return null;
  userSocketMap.get(userId)?.delete(socketId);
  if (!userSocketMap.get(userId)?.size) userSocketMap.delete(userId);
  socketUserMap.delete(socketId);
  return userId;
}

function emitToUsers(io, userIds, event, payload) {
  userIds.forEach((id) => {
    io.to(id.toString()).emit(event, payload);
    io.to(`user:${id}`).emit(event, payload);
  });
}

async function resolveUserFromToken(socket) {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers.authorization?.split(' ')[1];

  if (!token || !process.env.JWT_SECRET) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id).select('name profilePicture isOnline lastActive friends').lean();
}

module.exports = function initSocket(httpServer) {
  const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', async (socket) => {
    let userId = null;
    let socketUser = null;

    try {
      socketUser = await resolveUserFromToken(socket);
      if (socketUser?._id) {
        userId = socketUser._id.toString();
        socket.userId = userId;
        socket.user = socketUser;
        addSocket(userId, socket.id);
        socket.join(userId);
        socket.join(`user:${userId}`);
        await User.findByIdAndUpdate(userId, { isOnline: true, lastActive: new Date() });
      }
    } catch (err) {
      socket.emit('socket-auth-warning', { message: 'Socket connected without authenticated call channels.' });
    }

    socket.on('join', async (joinedUserId) => {
      userId = joinedUserId?.toString();
      if (!userId) return;

      socket.userId = userId;
      addSocket(userId, socket.id);
      socket.join(userId);
      socket.join(`user:${userId}`);

      const user = await User.findByIdAndUpdate(
        userId,
        { isOnline: true, lastActive: new Date() },
        { new: true }
      ).select('name profilePicture friends').lean();

      socket.user = user || socket.user;
      io.emit('status-updated', { userId, isOnline: true });
      socket.emit('online-users-list', Array.from(userSocketMap.keys()));

      user?.friends?.forEach((friendId) => {
        io.to(`user:${friendId}`).emit('friend-online', { userId, status: 'online' });
      });
    });

    socket.on('join-conversation', async ({ conversationId } = {}) => {
      try {
        if (!conversationId || !socket.userId) return;
        const conv = await Conversation.findById(conversationId);
        if (!conv?.participants.some((p) => p.toString() === socket.userId)) return;

        socket.join(`conv:${conversationId}`);

        await Message.updateMany(
          {
            conversation: conversationId,
            sender: { $ne: socket.userId },
            readBy: { $ne: socket.userId },
          },
          {
            $addToSet: {
              readBy: socket.userId,
              deliveredTo: { user: socket.userId, deliveredAt: new Date() },
            },
            readAt: new Date(),
          }
        );

        await Conversation.findByIdAndUpdate(
          conversationId,
          { $set: { 'participantSettings.$[elem].unreadCount': 0 } },
          { arrayFilters: [{ 'elem.user': socket.userId }] }
        ).catch(() => {});

        socket.to(`conv:${conversationId}`).emit('messages-read', {
          conversationId,
          readBy: socket.userId,
          readAt: new Date(),
        });
      } catch (err) {
        socket.emit('socket-error', { message: 'Could not join conversation.' });
      }
    });

    socket.on('leave-conversation', ({ conversationId } = {}) => {
      if (conversationId) socket.leave(`conv:${conversationId}`);
    });

    socket.on('send-message', async (data = {}, callback) => {
      try {
        if (data.message) {
          emitToUsers(io, data.recipients || [], 'receive-message', data.message);
          io.to(`conv:${data.conversationId}`).emit('receive-message', data.message);
          callback?.({ ok: true });
          return;
        }

        const conversationId = data.conversationId;
        if (!conversationId || !socket.userId) return callback?.({ error: 'Conversation and sender are required.' });

        const conv = await Conversation.findById(conversationId);
        if (!conv?.participants.some((p) => p.toString() === socket.userId)) {
          return callback?.({ error: 'Not a participant.' });
        }

        const message = await Message.create({
          conversation: conversationId,
          sender: socket.userId,
          text: data.text || '',
          mediaUrl: data.mediaUrl || '',
          mediaType: data.mediaType || '',
          mediaMetadata: data.mediaMetadata,
          linkPreview: data.linkPreview,
          location: data.location,
          repliedTo: data.repliedToId || data.repliedTo,
          isForwarded: !!data.isForwarded,
          readBy: [socket.userId],
        });

        const populated = await Message.findById(message._id).populate('sender', 'name profilePicture');
        conv.lastMessage = {
          text: populated.text || `Sent a ${populated.mediaType || 'message'}`,
          sender: socket.userId,
          createdAt: new Date(),
        };
        conv.lastMessagePreview = conv.lastMessage.text;
        conv.lastMessageTime = new Date();
        conv.updatedAt = new Date();
        await conv.save();

        io.to(`conv:${conversationId}`).emit('receive-message', populated);
        emitToUsers(
          io,
          conv.participants.filter((p) => p.toString() !== socket.userId),
          'receive-message',
          populated
        );
        callback?.({ ok: true, message: populated });
      } catch (err) {
        callback?.({ error: 'Message delivery failed.' });
      }
    });

    socket.on('typing-start', (data = {}) => {
      emitToUsers(io, data.recipients || [], 'user-typing', data);
      socket.to(`conv:${data.conversationId}`).emit('user-typing', data);
    });

    socket.on('typing-stop', (data = {}) => {
      emitToUsers(io, data.recipients || [], 'user-stopped-typing', data);
      socket.to(`conv:${data.conversationId}`).emit('user-stopped-typing', data);
    });

    socket.on('typing', (data = {}) => {
      socket.to(`conv:${data.conversationId}`).emit(data.isTyping ? 'user-typing' : 'user-stopped-typing', data);
    });

    socket.on('call-offer', ({ toUserId, offer, type, conversationId }) => {
      emitToUsers(io, [toUserId], 'call-incoming', {
        from: socket.userId,
        fromName: socket.user?.name,
        fromAvatar: socket.user?.profilePicture,
        offer,
        type,
        conversationId,
      });
    });

    socket.on('call-answer', ({ toUserId, answer }) => {
      emitToUsers(io, [toUserId], 'call-answered', { from: socket.userId, answer });
    });

    socket.on('ice-candidate', ({ toUserId, candidate }) => {
      emitToUsers(io, [toUserId], 'ice-candidate', { from: socket.userId, candidate });
    });

    socket.on('call-ended', ({ toUserId, conversationId, duration = 0, type = 'audio' }) => {
      emitToUsers(io, [toUserId], 'call-ended', { from: socket.userId, duration });
      if (conversationId && socket.userId) {
        Conversation.findByIdAndUpdate(conversationId, {
          $push: {
            callLogs: {
              type,
              initiator: socket.userId,
              participants: [socket.userId, toUserId],
              duration,
              startedAt: new Date(Date.now() - duration * 1000),
              endedAt: new Date(),
              status: 'completed',
            },
          },
        }).catch(() => {});
      }
    });

    socket.on('call-declined', ({ toUserId }) => {
      emitToUsers(io, [toUserId], 'call-declined', { from: socket.userId });
    });

    socket.on('call-busy', ({ toUserId }) => {
      emitToUsers(io, [toUserId], 'call-busy', { from: socket.userId });
    });

    socket.on('mark-notification-read', async ({ notificationId } = {}) => {
      if (!notificationId) return;
      const Notification = require('../models/Notification');
      await Notification.findByIdAndUpdate(notificationId, { isRead: true }).catch(() => {});
    });

    socket.on('disconnect', async () => {
      const disconnectedUserId = removeSocket(socket.id);
      if (!disconnectedUserId || userSocketMap.has(disconnectedUserId)) return;

      const lastActive = new Date();
      await User.findByIdAndUpdate(disconnectedUserId, { isOnline: false, lastActive }).catch(() => {});
      io.emit('status-updated', { userId: disconnectedUserId, isOnline: false });

      const user = await User.findById(disconnectedUserId).select('friends').lean().catch(() => null);
      user?.friends?.forEach((friendId) => {
        io.to(`user:${friendId}`).emit('friend-online', {
          userId: disconnectedUserId,
          status: 'offline',
          lastActive,
        });
      });
    });
  });

  return io;
};
