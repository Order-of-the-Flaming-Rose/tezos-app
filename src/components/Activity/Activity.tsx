import React, { useEffect } from 'react';

import {
  useOperationsDispatchContext,
  useOperationsStateContext,
} from '../../contexts/OperationsContext';
import Preloader from '../Preloader';

import styles from './Activity.module.scss';

function Activity() {
  // eslint-disable-next-line no-unused-vars
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
    <div className={styles.container}>
      <h2 className={styles.container__title}>activity </h2>
      <ul>
        {activity.map((op: any) => {
          return (
            <li key={op.id} className={styles.item}>
              {op.type === 'transaction' ? (
                <span className={styles.item__amount}>
                  {' '}
                  amount : {op.amount}
                </span>
              ) : null}
              <span className={styles.item__time}>{op.timestamp}</span>

              {op.type === 'transaction' ? (
                <>
                  <span className={styles.item__from}>
                    from {op.sender.address}
                  </span>
                  <span className={styles.item__to}>
                    to {op.target.address}
                  </span>
                </>
              ) : null}
              <a
                className={styles.item__hash}
                href={`https://hangzhou2net.tzkt.io/${op.hash}`}
                target='_blank'
                rel='noreferrer'
              >
                view in the block explorer {op.hash}
              </a>
            </li>
          );
        })}
        {loading ? <Preloader /> : null}
      </ul>
    </div>
  );
}

export default Activity;
