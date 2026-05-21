/* frontend/src/store/authStore.js — PROMPT-01.D */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:  null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      updateUser: (updates) => set(state => ({ user: { ...state.user, ...updates } })),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('minds_books_token');
        localStorage.removeItem('minds_books_user');
      },
      getToken: () => get().token,
    }),
    {
      name: 'mb-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
