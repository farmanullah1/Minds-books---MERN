/* frontend/src/store/notifStore.js — PROMPT-01.D */
import { create } from 'zustand';

export const useNotifStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    set({ notifications, unreadCount });
  },

  addNotification: (notif) => {
    set(s => ({
      notifications: [notif, ...s.notifications].slice(0, 100),
      unreadCount: notif.read ? s.unreadCount : s.unreadCount + 1,
    }));
  },

  markRead: (id) => {
    set(s => {
      const updated = s.notifications.map(n =>
        n._id === id ? { ...n, read: true } : n
      );
      const unreadCount = updated.filter(n => !n.read).length;
      return { notifications: updated, unreadCount };
    });
  },

  markAllRead: () => {
    set(s => ({
      notifications: s.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  removeNotification: (id) => {
    set(s => ({
      notifications: s.notifications.filter(n => n._id !== id),
      unreadCount: s.notifications.find(n => n._id === id && !n.read)
        ? Math.max(0, s.unreadCount - 1)
        : s.unreadCount,
    }));
  },

  setLoading: (loading) => set({ loading }),
}));
