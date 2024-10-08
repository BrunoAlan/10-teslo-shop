import { authCheckStatus, authLogin } from '@/src/actions/auth/auth';
import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import type { User } from '@/src/domain/entities/user';
import type { AuthStatus } from '@/src/infrastructure/interfaces/auth.status';
import { create } from 'zustand';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}
export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    if (!response) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }
    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });

    await StorageAdapter.setItem('token', response.token);

    return true;
  },
  checkStatus: async () => {
    const response = await authCheckStatus();
    if (!response) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
