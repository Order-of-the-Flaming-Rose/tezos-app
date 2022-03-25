import React, { useEffect } from 'react';
import {
  useWalletDispatchContext,
  useWalletStateContext,
} from '../../contexts/WalletContext';

import styles from './Balance.module.scss';

function Balance() {
  const { balance, walletAddress, isLoading } = useWalletStateContext();
  const { getBalance } = useWalletDispatchContext();

  const usa = ((balance.xtz / 1000000) * balance.quoteUsd).toFixed(2);
  const address = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
  useEffect(() => getBalance(), []);

  return (
    <div className={styles.balance}>
      {isLoading ? (
        'loading ...'
      ) : (
        <>
          <div className={styles.balance__usd}>address {address}</div>
          <div className={styles.balance__tz}>{`amount ${
            balance.xtz / 1000000
          } ꜩ`}</div>
          <div className={styles.balance__usd}>{`currency ${usa} $`}</div>
        </>
      )}
    </div>
  );
}

export default Balance;
