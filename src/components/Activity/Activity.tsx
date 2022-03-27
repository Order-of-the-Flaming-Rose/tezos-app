/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import {
  useOperationsDispatchContext,
  useOperationsStateContext,
} from '../../contexts/OperationsContext';
import Operation from '../Operation';
import Preloader from '../Preloader';
import Title from '../Title';

export type TOperation = {
  type: string;
  amount?: number;
  timestamp: string;
  sender?: { address: string };
  target?: { address: string };
  hash: string;
};

function Activity() {
  const { activity, loading } = useOperationsStateContext();
  const { scrollHandler, dataHandler } = useOperationsDispatchContext();

  useEffect(() => {
    dataHandler();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function scroll() {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <Title size={3}>activity </Title>
      <ul>
        {activity.map((op: TOperation) => {
          return <Operation {...op} />;
        })}
        {loading ? <Preloader /> : null}
      </ul>
    </>
  );
}

export default Activity;
