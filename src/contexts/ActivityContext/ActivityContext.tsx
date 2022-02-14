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

type TActivityContextValue = {
  isError: boolean;
  isLoading: boolean;
  network: string;
  lastId: number;
  activity: any[];
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
};

const defaultState: TActivityContextValue = {
  isError: false,
  isLoading: false,
  network: '',
  lastId: 0,
  activity: [],
  dataHandler: () => undefined,
  scrollHandler: (e: any) => undefined,
};

const ActivityContext = createContext(defaultState);
export const useActivityContext = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

type TActivityProps = {
  children: React.ReactNode;
};

export function ActivityProvider({ children }: TActivityProps) {
  const [network, setNetwork] = useState('https://api.hangzhou2net.tzkt.io/');
  const [lastId, setLastId] = useState(0);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const handleOffset = useCallback(
    () => console.log(lastId),
    [setLastId, lastId],
  );

  const dataHandler = async () => {
    const rec = await axios.get(
      'https://api.hangzhou2net.tzkt.io/v1/accounts/tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq/operations?limit=5',
    );
    setActivity(rec.data);
    setLastId(() => {
      return rec.data[rec.data.length - 1].id;
    });
  };

  useEffect(() => {
    const handle = async () => {
      console.log(5);
      if (fetching) {
        const rec = await axios.get(
          `https://api.hangzhou2net.tzkt.io/v1/accounts/tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq/operations?limit=5&lastid=${lastId}`,
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
      isError,
      isLoading,
      lastId,
      network,
      activity,
      dataHandler,
      scrollHandler,
    }),
    [lastId, activity],
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
}
