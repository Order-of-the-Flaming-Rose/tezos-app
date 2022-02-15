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

type TWalletContextValue = {
  isError: boolean;
  isLoading: boolean;
  network: string;
  lastId: number;
  activity: any[];
  balance: any;
  auth: boolean;
  getAuth: (val: boolean) => void;
  getBalance: () => void;
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
  walletAddress: string;
};

const defaultState: TWalletContextValue = {
  isError: false,
  isLoading: false,
  network: '',
  lastId: 0,
  activity: [],
  balance: null,
  auth: false,
  getAuth: () => undefined,
  getBalance: () => undefined,
  dataHandler: () => undefined,
  scrollHandler: (e: any) => undefined,
  walletAddress: '',
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

export function WalletProvider({ children }: TWalletProps) {
  const [network, setNetwork] = useState('https://api.hangzhou2net.tzkt.io/');
  const [walletAddress, setWalletAddress] = useState(
    'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
  );
  const [lastId, setLastId] = useState(0);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [balance, setBalance] = useState({});
  const [auth, setAuth] = useState(false);

  const getAuth = (val: boolean) => setAuth(val);

  const handleOffset = useCallback(
    () => console.log(lastId),
    [setLastId, lastId],
  );

  const getBalance = async () => {
    const rec = await axios.get(
      `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}`,
    );
    const xtz = rec.data.balance;
    const quote = await axios.get(`https://api.hangzhou2net.tzkt.io/v1/head`);
    const {
      data: { quoteUsd },
    } = quote;
    const next = { xtz, quoteUsd };
    setBalance(next);
  };
  const dataHandler = async () => {
    const rec = await axios.get(
      `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}/operations?limit=5`,
    );
    setActivity(rec.data);
    setLastId(() => {
      return rec.data[rec.data.length - 1].id;
    });
  };

  useEffect(() => {
    const handle = async () => {
      if (fetching) {
        const rec = await axios.get(
          `https://api.hangzhou2net.tzkt.io/v1/accounts/${walletAddress}/operations?limit=5&lastid=${lastId}`,
        );
        const { data } = rec;
        const copy = activity;
        const next = copy.concat(data);
        setActivity(next);
        setLastId(data[data.length - 1].id);
      }
      setFetching(false);
    };
    handle();
  }, [fetching]);

  const scrollHandler = useCallback(
    (e: any) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
        100
      ) {
        setFetching(true);
      }
    },
    [lastId, fetching, activity],
  );

  const contextValue = useMemo(
    () => ({
      auth,
      getAuth,
      isError,
      isLoading,
      lastId,
      network,
      activity,
      balance,
      walletAddress,
      dataHandler,
      scrollHandler,
      getBalance,
    }),
    [lastId, activity, balance, walletAddress, auth],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
