import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('ibvap_user') || 'null'),
  token: localStorage.getItem('ibvap_token'),
  isAuthenticated: !!localStorage.getItem('ibvap_token'),
  login: (user, token) => {
    localStorage.setItem('ibvap_user', JSON.stringify(user));
    localStorage.setItem('ibvap_token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('ibvap_user');
    localStorage.removeItem('ibvap_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
