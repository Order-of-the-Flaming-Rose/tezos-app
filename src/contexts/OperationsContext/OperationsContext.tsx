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
import fetchReducer, { fetchTypes } from '../../utils/fetchReducer';
import { useWalletContext } from '../WalletContext/WalletContext';

type TOperationsContextValue = {
  lastId: number;
  activity: any;
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
  loading: boolean;
  error: boolean;
};

const defaultState: TOperationsContextValue = {
  lastId: 0,
  activity: [],
  dataHandler: () => undefined,
  scrollHandler: () => undefined,
  loading: false,
  error: false,
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
  const limit = useRef(false);

  const initialState: Tstate = {
    activity: [],
    lastId: 0,
  };
  const initialLoading: { loading: boolean; error: boolean } = {
    loading: false,
    error: false,
  };

  const [state, dispatch] = useReducer(activityReducer, initialState);
  const [loadingState, loadingDispatch] = useReducer(
    fetchReducer,
    initialLoading,
  );

  const dataHandler = useCallback(async () => {
    loadingDispatch({ type: fetchTypes.START });
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
      loadingDispatch({ type: fetchTypes.CATCH });
    } finally {
      loadingDispatch({ type: fetchTypes.FINISH });
    }
  }, []);

  useEffect(() => {
    const handle = async () => {
      if (limit.current) return;
      if (fetching) {
        loadingDispatch({ type: fetchTypes.START });
        try {
          const rec = await TZKTService.getNextOperations(
            walletAddress,
            state.lastId,
          );
          const { data } = rec;
          if (data.length < 5) {
            limit.current = true;
            console.log(rec.data[rec.data.length - 1].id);
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
          loadingDispatch({ type: fetchTypes.FINISH });
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
      loading: loadingState.loading,
      error: loadingState.error,
    }),
    [state.activity, loadingState.loading],
  );

  return (
    <OperationsContext.Provider value={contextValue}>
      {children}
    </OperationsContext.Provider>
  );
}

export { OperationsContext, OperationsProvider };
