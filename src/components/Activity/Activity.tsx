/* eslint-disable no-console */
/* eslint-disable func-names */
import React, { useEffect } from 'react';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Activity.module.scss';

function Activity() {
  const { dataHandler, scrollHandler, activity, lastId, fetching, setLimit } =
    useWalletContext();
  useEffect(() => {
    dataHandler();
    setLimit(false);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [lastId]);
  // console.log(fetching);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>activity </h2>
      <ul>
        {activity.map((op) => (
          <li key={op.id} className={styles.item}>
            <span className={styles.item__amount}>amount : {op.amount}</span>
            <span className={styles.item__time}>10:30 02-03-22</span>
            <span className={styles.item__target}>
              {' '}
              target: {op.target.address}
            </span>
            <span className={styles.item__hash}>{op.hash}</span>
            <span className={styles.item__sender}>{op.sender.address}</span>
          </li>
        ))}
        {fetching && 'fetching'}
      </ul>
    </div>
  );
}

export default Activity;
