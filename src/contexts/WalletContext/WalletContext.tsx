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
  useState,
} from 'react';

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';
import { useHistory } from 'react-router-dom';
import { TZKTService } from '../../api/tzktClient';
import { API } from '../../api';

const network = NetworkType.HANGZHOUNET;
const rpcUrl = 'https://hangzhounet.api.tez.ie';
const wallet = new BeaconWallet({
  preferredNetwork: network,
  name: 'some name',
});
const Tezos = new TezosToolkit(rpcUrl);

type TWalletContextValue = {
  isError: boolean;
  isLoading: boolean;
  lastId: number;
  activity: any[];
  balance: any;
  auth: boolean;
  fetching: boolean;
  setLimit: (val: boolean) => void;
  getAuth: (val: boolean) => void;
  getBalance: () => void;
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
  walletAddress: string;
  getWallet: () => void;
  tokens: number | string;
  getSummary: () => void;
};

const defaultState: TWalletContextValue = {
  isError: false,
  isLoading: false,
  lastId: 0,
  activity: [],
  balance: null,
  auth: false,
  fetching: false,
  setLimit: () => undefined,
  getAuth: () => undefined,
  getBalance: () => undefined,
  dataHandler: () => undefined,
  scrollHandler: () => undefined,
  walletAddress: '',
  getWallet: () => undefined,
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
  const [walletAddress, setWalletAddress] = useState('');
  // activity is list of operations of the current wallet
  const [lastId, setLastId] = useState(0);
  const [activity, setActivity] = useState<any[]>([]);
  const [limit, setLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [balance, setBalance] = useState({});
  const [auth, setAuth] = useState(false);
  const [tokens, getTokens] = useState(0);

  const history = useHistory();

  const getWallet = async () => {
    await wallet.requestPermissions({ network: { type: network } });

    const activeAccount = await wallet.client.getActiveAccount();
    Tezos.setWalletProvider(wallet);
    console.log(activeAccount);
    const val = activeAccount?.address;
    setWalletAddress(val || '');
  };
  // after login access runs getAuth func
  const getAuth = (val: boolean) => setAuth(val);

  useEffect(() => {
    if (!auth) {
      setWalletAddress('');
      localStorage.clear();
    }
  }, [auth]);

  // get balance during the summary page mount
  const getBalance = async () => {
    setIsLoading(true);
    setIsError(false);

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
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // first part of operation
  const dataHandler = async () => {
    const rec = await TZKTService.getOperations(walletAddress);
    setActivity(rec.data);
    setLastId(() => {
      return rec.data[rec.data.length - 1].id;
    });
  };
  // next parts of wallet operations
  useEffect(() => {
    const handle = async () => {
      if (limit) return;

      if (fetching) {
        try {
          const rec = await TZKTService.getNextOperations(
            walletAddress,
            lastId,
          );
          const { data } = rec;
          if (!data.length) {
            setLimit(true);
          }
          const copy = activity;
          const next = copy.concat(data);
          setActivity(next);
          setLastId(data[data.length - 1].id);
        } catch (e) {
          setLimit(true);
          console.log(e);
        } finally {
          setFetching(false);
        }
      }
    };
    handle();
  }, [fetching, limit]);

  // func to run fetching of operations
  const scrollHandler = useCallback(
    (e: any) => {
      if (limit) {
        return;
      }
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        setFetching(true);
      }
    },
    [lastId],
  );

  useEffect(() => {
    console.log('start');
    if (!walletAddress) return;
    const getTokensX = async () => {
      try {
        const rec = await TZKTService.getAllowance(walletAddress);
        const val = rec.data.value.balance;
        console.log(val);
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
      auth,
      getAuth,
      isError,
      isLoading,
      lastId,
      activity,
      balance,
      fetching,
      // here
      setLimit,
      walletAddress,
      dataHandler,
      scrollHandler,
      getBalance,
      getWallet,
      tokens,
      getSummary,
    }),
    [lastId, activity, balance, walletAddress, auth, tokens],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
