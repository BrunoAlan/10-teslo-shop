import { useNavigation } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useNavigation();
  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        router.reset({
          index: 0,
          routes: [{ name: 'Home' } as never],
        });
      } else {
        router.reset({
          index: 0,
          routes: [{ name: 'Login' } as never],
        });
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [status]);

  return <>{children}</>;
};
