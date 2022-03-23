/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { API } from '../../api';
import { TZKTService } from '../../api/tzktClient';
import fetchReducer, { Tfetch, fetchTypes } from '../../utils/fetchReducer';

type TWalletContextValue = {
  isError: boolean;
  isLoading: boolean;

  balance: any;
  auth: boolean;

  getAuth: (val: boolean) => void;
  getBalance: () => void;

  walletAddress: string;

  tokens: number | string;
  getSummary: () => void;
};

const defaultState: TWalletContextValue = {
  isError: false,
  isLoading: false,

  balance: null,
  auth: false,

  getAuth: () => undefined,
  getBalance: () => undefined,

  walletAddress: '',

  tokens: 0,
  getSummary: () => undefined,
};

const WalletContext = createContext(defaultState);
export const useWalletContext = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

type TWalletProps = {
  children: React.ReactNode;
};
// walletAddress,

export function WalletProvider({ children }: TWalletProps) {
  // wallet address
  const [walletAddress, setWalletAddress] = useState(
    'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
  );

  const [balance, setBalance] = useState({});
  const [auth, setAuth] = useState(false);
  const [tokens, getTokens] = useState(0);
  const initialState: Tfetch = {
    loading: false,
    error: false,
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const history = useHistory();

  // after login access runs getAuth func
  const getAuth = (val: boolean) => setAuth(val);

  // get balance during the summary page mount
  const getBalance = async () => {
    dispatch({ type: fetchTypes.START });

    try {
      const rec = await TZKTService.getAccount(walletAddress);
      const quote = await TZKTService.getCurrencyRate();
      const xtz = rec.data.balance;
      const {
        data: { quoteUsd },
      } = quote;
      const next = { xtz, quoteUsd };

      setBalance(next);
    } catch (error) {
      console.log(error);
      dispatch({ type: fetchTypes.CATCH });
    } finally {
      dispatch({ type: fetchTypes.FINISH });
    }
  };

  useEffect(() => {
    if (!walletAddress) return;
    const getTokensX = async () => {
      try {
        const rec = await TZKTService.getAllowance(walletAddress);
        const val = rec.data.value.balance;

        getTokens(val);
      } catch (error) {
        console.log(error);
      }
    };

    getTokensX();
  }, [walletAddress]);

  const getSummary = async () => {
    try {
      const rec = await API.me();

      const {
        data: {
          user: { address },
        },
      } = rec;
      setWalletAddress(address);
    } catch (error) {
      console.log(error);
      history.push('/billing');
    }
  };

  // context value data
  const contextValue = useMemo(
    () => ({
      isError: state.error,
      isLoading: state.loading,
      // fetching,

      // auth
      auth,
      getAuth,

      // balance
      balance,
      getBalance,

      // get wallet to sign up

      // summary
      getSummary,
      walletAddress,
      // part of summary
      tokens,
    }),
    [getBalance, balance, walletAddress, auth, tokens, state.loading],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
