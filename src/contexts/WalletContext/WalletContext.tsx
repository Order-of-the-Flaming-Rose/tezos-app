/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { Axios } from 'axios';
import axios from 'axios';
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
import User from '../../services/Api/User';

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
  scrollHandler: (e: any) => undefined,
  walletAddress: '',
  getWallet: () => undefined,
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
// 'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',

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

  const history = useHistory();
  const getWallet = async () => {
    const UserInstance = new User('https://hangzhounet.api.tez.ie');
    const wal = await UserInstance.connectWallet();
    setWalletAddress(wal);
    history.push('/summary');
  };
  // after login access runs getAuth func
  const getAuth = (val: boolean) => setAuth(val);

  // get balance during the summary page mount
  const getBalance = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const rec = await axios.get(
        `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}`,
      );
      const quote = await axios.get(`https://api.hangzhou2net.tzkt.io/v1/head`);
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
    const rec = await axios.get(
      `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}/operations?limit=5`,
    );
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
          const rec = await axios.get(
            `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}/operations?limit=5&lastid=${lastId}`,
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
        console.log('finish');
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
      setLimit,
      walletAddress,
      dataHandler,
      scrollHandler,
      getBalance,
      getWallet,
    }),
    [lastId, activity, balance, walletAddress, auth],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
