/* eslint-disable default-param-last */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { authReducer } from './authReducer';
import { TAuthContextValue, TAuthValue } from './authTypes';

export const initial: TAuthValue = {
  telegram: '',
  discord: '',
  wallet: 'kkkjhhhhhhhbvjkvljvuvcvtyicctrxutxr',
  step: 3,
};

const defaultState: TAuthContextValue = {
  state: initial,
  dispatch: () => null,
};

const AuthContext = createContext<TAuthContextValue>(defaultState);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }
  return ctx;
};

type TAuthProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: TAuthProps) {
  const [state, dispatch] = useReducer(authReducer, initial);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
