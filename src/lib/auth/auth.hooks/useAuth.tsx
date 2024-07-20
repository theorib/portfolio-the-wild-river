'use client';

import { Session } from 'lucia';
import { useEffect, useState } from 'react';

import { UserWithoutPassword } from '@/lib/zod.schemas';
import { logout, validateSession } from '@/lib/auth';

export default function useAuth() {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { user, session } = await validateSession();
      if (!user || !session) {
        setUser(null);
        setSession(null);
        setIsLoading(false);
        return;
      }
      setUser(user);
      setSession(session);
      setIsLoading(false);
      return;
    })();
  }, []);
  return {
    user,
    session,
    isLoading,
    logout,
  };
}
