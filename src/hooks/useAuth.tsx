'use client';

import { Session } from 'lucia';
import { useEffect, useState } from 'react';
import { logout } from '@/lib/actions/auth.actions/logout.actions';
import { validateSession } from '@/lib/actions/auth.actions/authSession.actions';
import { UserWithoutPassword } from '@/lib/zod.schemas';

export default function useAuth() {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
