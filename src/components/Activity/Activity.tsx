/* eslint-disable func-names */
import React, { useEffect } from 'react';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Activity.module.scss';

function Activity() {
  const { dataHandler, scrollHandler, activity, lastId } = useWalletContext();
  useEffect(() => {
    dataHandler();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [lastId]);

  return (
    <div className={styles.container}>
      <h2>activity </h2>
      <ul>
        {activity.map((op) => (
          <li key={op.id} className={styles.item}>
            {op.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activity;
