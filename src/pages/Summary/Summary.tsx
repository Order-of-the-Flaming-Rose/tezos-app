import React, { useEffect } from 'react';
import Activity from '../../components/Activity';
import Balance from '../../components/Balance';
import Invite from '../../components/Invite';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Summary.module.scss';

function Summary() {
  const { walletAddress, getSummary } = useWalletContext();

  useEffect(() => {
    getSummary();
  }, [walletAddress]);

  if (!walletAddress) {
    return 'you dont have avelaible operations, top up your account';
  }

  return (
    <div className={styles.wallet}>
      <h2 className={styles.wallet__title}>summary </h2>
      <div className={styles.wallet__balance}>
        <Balance />
      </div>
      <div className={styles.wallet__activity}>
        <Activity />
      </div>
      <div className={styles.wallet__invite}>
        <Invite />
      </div>
    </div>
  );
}

export default Summary;
