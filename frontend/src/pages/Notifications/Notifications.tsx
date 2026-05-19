/**
 * CodeDNA
 * Notifications.tsx — core functionality
 * exports: default Notifications
 * used_by: App.tsx
 * rules: Premium design, grouping notifications of multiple likes on same post, stagger entrance animations with Framer Motion, unread rows with yellow left border.
 */

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchNotifications, markAsRead, markAllAsRead } from '../../store/slices/notificationsSlice';
import { getInitials } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { FiCheck, FiBell, FiTrash2, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Notifications.css';

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, unreadCount, loading } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  // Grouping notifications: Multiple likes on same post -> "Name1, Name2, and X others liked your post."
  const groupNotifications = (notifs: any[]) => {
    const grouped: any[] = [];
    const likesMap: { [postId: string]: any[] } = {};

    notifs.forEach((n) => {
      if (n.type === 'like' && n.post?._id) {
        if (!likesMap[n.post._id]) {
          likesMap[n.post._id] = [];
        }
        likesMap[n.post._id].push(n);
      } else {
        grouped.push(n);
      }
    });

    // Process grouped likes
    Object.keys(likesMap).forEach((postId) => {
      const likes = likesMap[postId];
      if (likes.length === 1) {
        grouped.push(likes[0]);
      } else {
        const newestLike = likes[0];
        const count = likes.length;
        const otherCount = count - 2;
        
        let text = '';
        if (count === 2) {
          text = `and ${likes[1].fromUser.name} liked your post`;
        } else {
          text = `, ${likes[1].fromUser.name}, and ${otherCount} other${otherCount > 1 ? 's' : ''} liked your post`;
        }

        grouped.push({
          ...newestLike,
          isGrouped: true,
          groupedUsers: likes.map(l => l.fromUser),
          text: text,
          originalNotifications: likes
        });
      }
    });

    // Sort grouped notifications back to original date order
    return grouped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getNotifText = (notif: any) => {
    if (notif.isGrouped) {
      return notif.text;
    }
    switch (notif.type) {
      case 'like': return 'liked your post';
      case 'comment': return `commented "${notif.text}" on your post`;
      case 'friend_request': return 'sent you a friend request';
      case 'friend_accept': return 'accepted your friend request';
      default: return notif.text || 'interacted with you';
    }
  };

  const sanitizedItems = items.map((n: any) => ({
    ...n,
    fromUser: n.fromUser || { _id: 'deleted', name: 'Deleted User', profilePicture: '' }
  }));

  const groupedNotifications = groupNotifications(sanitizedItems);

  const getNotifLink = (notif: any) => {
    if (notif.type === 'friend_request' || notif.type === 'friend_accept') {
      return `/profile/${notif.fromUser._id}`;
    }
    return `/`; // Placeholder for posts
  };

  return (
    <div className="notifications-page-container">
      <div className="notifications-card card">
        <div className="notifications-page-header">
          <div className="header-left">
            <FiBell className="bell-icon" size={24} />
            <h2>Notification Center</h2>
            {unreadCount > 0 && <span className="unread-count-badge">{unreadCount} new</span>}
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-secondary btn-mark-all" onClick={handleMarkAllAsRead}>
              <FiCheck /> Mark all as read
            </button>
          )}
        </div>

        <div className="notifications-list">
          {loading && groupedNotifications.length === 0 ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Syncing notifications...</p>
            </div>
          ) : groupedNotifications.length === 0 ? (
            <div className="empty-state">
              <FiBell size={48} />
              <h3>All caught up!</h3>
              <p>You have no new notifications at the moment.</p>
            </div>
          ) : (
            groupedNotifications.map((notif, index) => {
              const isUnread = notif.isGrouped 
                ? notif.originalNotifications.some((on: any) => !on.read)
                : !notif.read;

              return (
                <motion.div
                  key={notif._id}
                  className={`notification-row ${isUnread ? 'unread' : ''}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <Link to={getNotifLink(notif)} className="row-link">
                    <div className="user-avatars-group">
                      {notif.isGrouped ? (
                        <div className="stacked-avatars">
                          {notif.groupedUsers.slice(0, 3).map((u: any, i: number) => (
                            <div key={i} className="stacked-avatar-wrapper" style={{ zIndex: 3 - i }}>
                              {u.profilePicture ? (
                                <img src={u.profilePicture} alt={u.name} />
                              ) : (
                                <div className="avatar-initials">{getInitials(u.name)}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="single-avatar">
                          {notif.fromUser.profilePicture ? (
                            <img src={notif.fromUser.profilePicture} alt={notif.fromUser.name} />
                          ) : (
                            <div className="avatar-initials">{getInitials(notif.fromUser.name)}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="notification-row-content">
                      <p className="notification-message">
                        <strong>{notif.fromUser.name}</strong>{' '}
                        {getNotifText(notif)}
                      </p>
                      <span className="notification-row-time">
                        <FiClock size={12} />
                        {new Date(notif.createdAt).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>

                    {isUnread && (
                      <button 
                        className="mark-row-read-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (notif.isGrouped) {
                            notif.originalNotifications.forEach((on: any) => {
                              if (!on.read) handleMarkAsRead(on._id);
                            });
                          } else {
                            handleMarkAsRead(notif._id);
                          }
                        }}
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    )}
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
