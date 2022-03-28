/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Activity from '../../components/Activity';
import Balance from '../../components/Balance';
import Invite from '../../components/Invite';
import Title from '../../components/Title';
// import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Summary.module.scss';

function Summary() {
  // const { walletAddress, getSummary } = useWalletContext();

  // useEffect(() => {
  //   getSummary();
  // }, [walletAddress]);

  return (
    <div className={styles.wallet}>
      <div className={styles.wallet__title}>
        <Title size={2}> summary</Title>
      </div>
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
