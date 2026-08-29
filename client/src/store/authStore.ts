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
  user: JSON.parse(localStorage.getItem('suraksha_user') || 'null'),
  token: localStorage.getItem('suraksha_token'),
  isAuthenticated: !!localStorage.getItem('suraksha_token'),
  login: (user, token) => {
    localStorage.setItem('suraksha_user', JSON.stringify(user));
    localStorage.setItem('suraksha_token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('suraksha_user');
    localStorage.removeItem('suraksha_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
