/* eslint-disable no-nested-ternary */
/* eslint-disable no-debugger */
import React from 'react';
import Invite from '../../components/Invite';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Home.module.scss';

function Home() {
  const { auth, walletAddress } = useWalletContext();

  return (
    <div className={styles.home}>
      <div className={styles.home__left}>
        <h2 className={styles.home__title}>home page</h2>
        <div className={styles.home__logo}>ꜩ</div>
      </div>
      <div className={styles.home__right}>
        {walletAddress ? (
          <Invite />
        ) : auth ? (
          'get wallet'
        ) : (
          'auth before you can get the wallet'
        )}
      </div>
    </div>
  );
}

export default Home;
