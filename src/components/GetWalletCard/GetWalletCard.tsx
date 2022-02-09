import React from 'react';
import styles from './GetWalletCard.module.scss';

function GetWalletCard() {
  return (
    <div className={styles.getwalletcard}>
      <button className={styles.getwalletcard__btn} type='button'>
        connect your wallet
      </button>
    </div>
  );
}

export default GetWalletCard;
