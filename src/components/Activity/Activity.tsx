import React, { useEffect } from 'react';
import { useOperationsContext } from '../../contexts/OperationsContext/OperationsContext';
import styles from './Activity.module.scss';

function Activity() {
  const { scrollHandler, dataHandler, activity, loading } =
    useOperationsContext();

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
        {loading ? <span>loading ...</span> : null}
      </ul>
    </div>
  );
}

export default Activity;
