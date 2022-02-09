/* eslint-disable no-console */
import React from 'react';
import styles from './SendCard.module.scss';

function SendCard() {
  const data = {
    discord: 'Vova#0000',
    telegram: '@Vovchanchyk',
    wallet: 'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
  };

  const list = Object.entries(data);

  return (
    <div className={styles.sendcard}>
      <div className={styles.sendcard__container}>
        <span className={styles.sendcard__title}>confirm and send</span>
        <ul className={styles.sendcard__list}>
          {list.map((val) => {
            return (
              <li>
                <span>{val[0]}</span>
                <span>{val[1]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SendCard;
