/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useState } from 'react';
import FormCard from '../FormCard';
import GetWalletCard from '../GetWalletCard';
import SendCard from '../SendCard';

import styles from './Auth.module.scss';

function Auth() {
  // eslint-disable-next-line no-unused-vars
  const [card, setCard] = useState(2);
  // const userdata = [
  //     'discord: Name#0000',
  //     'telegram: @vovchanchyk',
  //     'wallet address: tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
  //   ];
  const progress = card === 1 ? '0%' : card === 2 ? '50%' : '100%';

  // const handleCard = (val: number) => {
  //   console.log(val);
  //   if (!val) return;
  //   if (val > 3) return;
  //   setCard(val);
  // };

  const titles = ['your discrord/telegram', 'wallet', 'summary'];

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__header}>
          {titles[card - 1]}
          <div className={styles.auth__progress} style={{ width: progress }}>
            <span className={styles.auth__progresspoint} />
          </div>
        </div>
        <div className={styles.auth__body}>
          {card === 1 ? (
            <FormCard />
          ) : card === 2 ? (
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
