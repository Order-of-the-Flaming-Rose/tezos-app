/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

import { TZKTService } from '../../api/tzktClient';
import activityReducer, { Tstate, types } from '../../utils/activityReducer';
import { useWalletContext } from '../WalletContext/WalletContext';

type TOperationsContextValue = {
  lastId: number;
  activity: any;
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
  loading: boolean;
};

const defaultState: TOperationsContextValue = {
  lastId: 0,
  activity: [],
  dataHandler: () => undefined,
  scrollHandler: () => undefined,
  loading: false,
};

const OperationsContext = createContext(defaultState);
export const useOperationsContext = () => {
  const ctx = useContext(OperationsContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

function OperationsProvider({ children }: { children: React.ReactNode }) {
  const { walletAddress } = useWalletContext();
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const limit = useRef(false);

  const initialState: Tstate = {
    activity: [],
    lastId: 0,
  };

  const [state, dispatch] = useReducer(activityReducer, initialState);

  const dataHandler = useCallback(async () => {
    setLoading(true);
    try {
      const rec = await TZKTService.getOperations(walletAddress);
      dispatch({
        type: types.GETACTIVITY,
        payload: {
          activity: rec.data,
          lastId: rec.data[rec.data.length - 1].id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handle = async () => {
      if (limit.current) return;
      if (fetching) {
        setLoading(true);
        try {
          const rec = await TZKTService.getNextOperations(
            walletAddress,
            state.lastId,
          );
          const { data } = rec;
          if (!data.length) {
            limit.current = true;
          }
          dispatch({
            type: types.GETACTIVITY,
            payload: {
              activity: rec.data,
              lastId: rec.data[rec.data.length - 1].id,
            },
          });
        } catch (e) {
          limit.current = true;
          console.log(e);
        } finally {
          setFetching(false);
          setLoading(false);
        }
      }
    };
    handle();
  }, [fetching]);

  // func to run fetching of operations
  const scrollHandler = useCallback(
    (e: any) => {
      if (limit.current) {
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
    [state.lastId],
  );

  const contextValue = useMemo(
    () => ({
      lastId: state.lastId,
      activity: state.activity,
      scrollHandler,
      dataHandler,
      loading,
    }),
    [state.activity, loading],
  );

  return (
    <OperationsContext.Provider value={contextValue}>
      {children}
    </OperationsContext.Provider>
  );
}

export { OperationsContext, OperationsProvider };
