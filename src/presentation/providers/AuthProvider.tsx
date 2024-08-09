import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'checking') {
      if (status === 'authenticated') {
        router.replace('/Home');
      } else {
        router.replace('/Login');
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [status]);

  return <>{children}</>;
};
