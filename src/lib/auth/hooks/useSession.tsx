'use client';
import {
  ValidateSessionResultClient,
  type ValidateSessionResult,
} from '@/lib/auth/authHelpers';
import { errorCatalog } from '@/lib/constants/errorCatalog';
import { createContext, useContext } from 'react';

const initialState: ValidateSessionResultClient = {
  user: null,
  session: null,
  isSuccess: false,
  error: errorCatalog.INVALID_SESSION.message,
};

const SessionContext = createContext<ValidateSessionResultClient>(initialState);

type SessionProviderProps = {
  children: React.ReactNode;
  value: ValidateSessionResultClient;
};

function SessionProvider({ children, value }: SessionProviderProps) {
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
