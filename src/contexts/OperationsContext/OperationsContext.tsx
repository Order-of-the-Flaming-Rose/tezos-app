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
import { useWalletStateContext } from '../WalletContext';

type TOperationsStateValue = {
  lastId: number;
  activity: any;
  loading: boolean;
  error: boolean;
};

const operationsDefaultState: TOperationsStateValue = {
  lastId: 0,
  activity: [],
  loading: false,
  error: false,
};

const OperationsStateContext = createContext(operationsDefaultState);

type TOperationsDispatchValue = {
  dataHandler: () => void;
  scrollHandler: (e: any) => void;
};

const operationsDefaultDispatch: TOperationsDispatchValue = {
  dataHandler: () => undefined,
  scrollHandler: () => undefined,
};

const OperationsDispatchContext = createContext(operationsDefaultDispatch);

function OperationsProvider({ children }: { children: React.ReactNode }) {
  const { walletAddress } = useWalletStateContext();
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

  const stateValue: TOperationsStateValue = useMemo(
    () => ({
      lastId: state.lastId,
      activity: state.activity,
      loading: loadingState.loading,
      error: loadingState.error,
    }),
    [state.activity, loadingState.loading],
  );

  const dispatchValue: TOperationsDispatchValue = useMemo(
    () => ({
      scrollHandler,
      dataHandler,
    }),
    [],
  );

  return (
    <OperationsDispatchContext.Provider value={dispatchValue}>
      <OperationsStateContext.Provider value={stateValue}>
        {children}
      </OperationsStateContext.Provider>
    </OperationsDispatchContext.Provider>
  );
}

const useOperationsDispatchContext = () => {
  const context = useContext(OperationsDispatchContext);
  if (!context) {
    throw new Error('useOperationDispatchContext must be in OperationProvider');
  }
  return context;
};

const useOperationsStateContext = () => {
  const context = useContext(OperationsStateContext);
  if (!context) {
    throw new Error('OperationsStateContext must be in OperationsProvider');
  }
  return context;
};

export {
  useOperationsDispatchContext,
  useOperationsStateContext,
  OperationsProvider,
};
