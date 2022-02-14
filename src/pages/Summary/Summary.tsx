import React from 'react';
import Activity from '../../components/Activity';
import Balance from '../../components/Balance';
import styles from './Summary.module.scss';

function Summary() {
  return (
    <div className={styles.wallet}>
      <h2 className={styles.wallet__title}>summary </h2>
      <div className={styles.wallet__balance}>
        <Balance />
      </div>
      <div className={styles.wallet__activity}>
        <Activity />
      </div>
      <div className={styles.wallet__invite}>invite</div>
    </div>
  );
}

export default Summary;
