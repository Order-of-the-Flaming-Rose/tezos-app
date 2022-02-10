/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext/AuthContext';
import FormCard from '../FormCard';
import GetWalletCard from '../GetWalletCard';
import SendCard from '../SendCard';

import styles from './Auth.module.scss';

function Auth() {
  const {
    state: { step },
  } = useAuthContext();
  console.log(step);

  const progress = step === 1 ? '0%' : step === 2 ? '50%' : '100%';

  const titles = ['your discrord/telegram', 'wallet', 'summary'];

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__header}>
          {titles[step - 1]}
          <div className={styles.auth__progress} style={{ width: progress }}>
            <span className={styles.auth__progresspoint} />
          </div>
        </div>
        <div className={styles.auth__body}>
          {step === 1 ? (
            <FormCard />
          ) : step === 2 ? (
            <GetWalletCard />
          ) : (
            <SendCard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
