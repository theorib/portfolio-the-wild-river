'use client';
import { validateSession } from '@/lib/auth';
import { createContext, useContext, useEffect, useState } from 'react';

type SessionContextType = Awaited<ReturnType<typeof validateSession>>;

const initialState = {
  user: null,
  session: null,
};
const SessionContext = createContext<SessionContextType>(initialState);

type SessionProviderProps = {
  children: React.ReactNode;
  value: SessionContextType;
};

function SessionProvider({ children, value }: SessionProviderProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const { user, session } = value;

  // useEffect(() => {
  //   if (user && session) {
  //     setIsLoading(false);
  //   }
  // }, [user, session]);

  // const returnValue = {
  //   ...value,
  //   isLoading,
  // };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

function useSession() {
  const sessionContext = useContext(SessionContext);
  if (sessionContext === undefined)
    throw new Error(`useSession was used outside of SessionProvider`);

  return sessionContext;
}

export { SessionProvider, useSession };
