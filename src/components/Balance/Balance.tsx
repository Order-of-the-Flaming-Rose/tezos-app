/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Balance.module.scss';

function Balance() {
  const { getBalance, balance, walletAddress, isLoading } = useWalletContext();

  const usa = ((balance.xtz / 1000000) * balance.quoteUsd).toFixed(2);
  const address = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  useEffect(() => getBalance(), []);

  return (
    <div className={styles.balance}>
      {isLoading ? (
        'loading ...'
      ) : (
        <>
          <div className={styles.balance__usd}>{address}</div>
          <div className={styles.balance__tz}>{`${
            balance.xtz / 1000000
          } ꜩ`}</div>
          <div className={styles.balance__usd}>{`${usa} $`}</div>
        </>
      )}
    </div>
  );
}

export default Balance;
