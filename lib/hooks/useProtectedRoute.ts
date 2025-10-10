import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/AuthSlice';

export default function useProtectedRoute() {
  const isAuthenticated = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
}
