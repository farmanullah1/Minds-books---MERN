/* frontend/src/store/uiStore.js — PROMPT-01.D */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let toastId = 0;

export const useUiStore = create(
  persist(
    (set, get) => ({
      // ── THEME ──────────────────────────────────────────────
      theme: 'system', // 'light' | 'dark' | 'system'
      setTheme: (theme) => {
        set({ theme });
        const isDark =
          theme === 'dark' ||
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.body.classList.toggle('dark', isDark);
      },

      // ── FONT SIZE ──────────────────────────────────────────
      fontSize: 'default', // 'small' | 'default' | 'large' | 'xlarge'
      setFontSize: (size) => {
        set({ fontSize: size });
        document.documentElement.setAttribute('data-fontsize', size);
      },

      // ── SIDEBAR ────────────────────────────────────────────
      leftSidebarOpen:   true,
      rightSidebarOpen:  true,
      mobileSidebarOpen: false,
      toggleMobileSidebar: () => set(s => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
      setMobileSidebar: (val) => set({ mobileSidebarOpen: val }),

      // ── TOASTS ────────────────────────────────────────────
      toasts: [],
      addToast: ({ message, title, type = 'default', duration = 4000, action } = {}) => {
        const id = ++toastId;
        set(s => ({
          toasts: [{ id, message, title, type, duration, action }, ...s.toasts].slice(0, 5),
        }));
        if (duration !== Infinity) {
          setTimeout(() => get().removeToast(id), duration + 300);
        }
        return id;
      },
      removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),

      // ── MODALS ────────────────────────────────────────────
      activeModal: null,
      modalData:   null,
      openModal:   (name, data = null) => set({ activeModal: name, modalData: data }),
      closeModal:  ()                   => set({ activeModal: null, modalData: null }),

      // ── TOP LOADING BAR ───────────────────────────────────
      isNavigating: false,
      setNavigating: (val) => set({ isNavigating: val }),

      // ── SEARCH OVERLAY ─────────────────────────────────────
      searchOpen: false,
      setSearchOpen: (val) => set({ searchOpen: val }),
    }),
    {
      name: 'mb-ui',
      partialize: (s) => ({ theme: s.theme, fontSize: s.fontSize }),
    }
  )
);
