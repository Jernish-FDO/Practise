import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'cyberpunk' : state.theme === 'cyberpunk' ? 'ocean' : 'dark',
        })),
    }),
    {
      name: 'portfolio-theme',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
)

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }))
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }))
    }, duration)
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

export const usePortfolioStore = create((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  isScrolling: false,
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
}))
