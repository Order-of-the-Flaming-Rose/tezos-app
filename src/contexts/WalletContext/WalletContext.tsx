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
import User from '../../services/Api/User';
import { TZKTService } from '../../api/tzktClient';

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
  scrollHandler: () => undefined,
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

  const getWallet = async () => {
    const UserInstance = new User('https://hangzhounet.api.tez.ie');
    const wal = await UserInstance.connectWallet();
    // console.log(wal);
    setWalletAddress(wal);
  };
  // after login access runs getAuth func
  const getAuth = (val: boolean) => setAuth(val);

  // get balance during the summary page mount
  const getBalance = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const rec = await TZKTService.getAccount(
        'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
      );
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
    const rec = await TZKTService.getOperations(
      'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
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
          const rec = await TZKTService.getNextOperations(
            'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
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
    }),
    [lastId, activity, balance, walletAddress, auth],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
