/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable func-names */
import React, { useEffect } from 'react';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Activity.module.scss';

function Activity() {
  const { dataHandler, scrollHandler, activity, lastId, setLimit } =
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

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>activity </h2>
      <ul>
        {activity.map((op) => {
          return (
            <li key={op.id} className={styles.item}>
              {(op.type === 'transaction')?<span className={styles.item__amount}> amount : {op.amount}</span>:null}
              <span className={styles.item__time}>10:30 02-03-22</span>

            {(op.type === 'transaction')
            ? <>
            <span className={styles.item__from}>from {op.sender.address}</span>
             <span className={styles.item__to}>to {op.target.address}</span>
             </>
              : null
               } 
              <a className={styles.item__hash} href={`https://hangzhou2net.tzkt.io/${op.hash}`} target='_blank' rel="noreferrer">view in the block explorer {op.hash}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Activity;
