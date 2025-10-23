import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (userData, token) => {
        localStorage.setItem('token', token);
        set({ 
          user: userData, 
          token, 
          isAuthenticated: true 
        });
      },

      clearAuth: () => {
        localStorage.removeItem('token');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      updateUser: (userData) => set({ user: userData }),

      hasRole: (role) => {
        const { user } = get();
        return user?.roles?.includes(role);
      },

      hasAnyRole: (roles) => {
        const { user } = get();
        return roles?.some(role => user?.roles?.includes(role));
      },

      getRole: () => {
        const { user } = get();
        return user?.roles?.[0] || null;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

export default useAuthStore;
