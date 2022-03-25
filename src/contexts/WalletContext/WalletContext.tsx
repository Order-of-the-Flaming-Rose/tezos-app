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

type TWalletStateValue = {
  isError: boolean;
  isLoading: boolean;
  balance: any;
  auth: boolean;
  walletAddress: string;
  tokens: number | string;
};

const walletDefaultState: TWalletStateValue = {
  isError: false,
  isLoading: false,
  balance: null,
  auth: false,
  walletAddress: '',
  tokens: 0,
};
const WalletStateContext = createContext(walletDefaultState);
//= =============

type TWalletDispatchValue = {
  getAuth: (val: boolean) => void;
  getBalance: () => void;
  getSummary: () => void;
  getWallet: () => void;
};

const walletDefaultDispatch: TWalletDispatchValue = {
  getAuth: () => undefined,
  getBalance: () => undefined,
  getWallet: () => undefined,
  getSummary: () => undefined,
};
const WalletDispatchContext = createContext(walletDefaultDispatch);

type TWalletProps = {
  children: React.ReactNode;
};
// walletAddress,

function WalletProvider({ children }: TWalletProps) {
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

  const stateValue: TWalletStateValue = useMemo(
    () => ({
      isError: state.error,
      isLoading: state.loading,
      auth,
      tokens,
      balance,
      walletAddress,
    }),
    [balance, walletAddress, auth, tokens, state.loading],
  );

  const dispatchValue: TWalletDispatchValue = useMemo(
    () => ({
      getBalance,
      getSummary,
      getAuth,
      getWallet: () => undefined,
    }),
    [getBalance],
  );

  return (
    <WalletStateContext.Provider value={stateValue}>
      <WalletDispatchContext.Provider value={dispatchValue}>
        {children}
      </WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  );
}

const useWalletStateContext = () => {
  const ctx = useContext(WalletStateContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

const useWalletDispatchContext = () => {
  const ctx = useContext(WalletDispatchContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

export { useWalletDispatchContext, useWalletStateContext, WalletProvider };
