import { useState, useEffect } from 'react';
import { auth } from '../firebase';

interface UserLimits {
  isPremium: boolean;
  emailsSent: number;
  freeLimit: number;
  remaining: number;
  canSendEmail: boolean;
  loading: boolean;
  error: string | null;
}

const SERVER_URL = 'http://localhost:3000';

export function useUserLimits() {
  const [limits, setLimits] = useState<UserLimits>({
    isPremium: false,
    emailsSent: 0,
    freeLimit: 100,
    remaining: 100,
    canSendEmail: true,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLimits({
          isPremium: false,
          emailsSent: 0,
          freeLimit: 100,
          remaining: 100,
          canSendEmail: true,
          loading: false,
          error: null
        });
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/api/user/limit`, {
          headers: {
            'x-user-id': user.uid
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setLimits({
            isPremium: data.isPremium,
            emailsSent: data.emailsSent,
            freeLimit: data.freeLimit,
            remaining: data.remaining,
            canSendEmail: data.canSendEmail,
            loading: false,
            error: null
          });
        } else {
          setLimits(prev => ({ ...prev, loading: false, error: 'Failed to fetch limits' }));
        }
      } catch (error) {
        setLimits(prev => ({ ...prev, loading: false, error: 'Failed to fetch limits' }));
      }
    });

    return () => unsubscribe();
  }, []);

  return limits;
}
