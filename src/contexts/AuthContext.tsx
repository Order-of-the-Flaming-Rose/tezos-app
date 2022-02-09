/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext } from 'react';

type TAuthValue = {
  telegram: string;
  discord: string;
};

const AuthContext = createContext<TAuthValue>({ telegram: '', discord: '' });
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }
};

type TAuthProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: TAuthProps) {
  const telegram = '@Vovchanchyk';
  const discord = 'Vova';

  return (
    <AuthContext.Provider value={{ telegram, discord }}>
      {children}
    </AuthContext.Provider>
  );
}
