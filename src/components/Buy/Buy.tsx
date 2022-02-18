/* eslint-disable no-undef */
import React from 'react';
import styles from './Buy.module.scss';

function Buy() {
  return (
    <div className={styles.buy}>
      <h3 className={styles.buy__title}>buy token x</h3>

      <form action='#' className={styles.buy__form}>
        <input className={styles.buy__input} type='number' name='number' />
        <input className={styles.buy__input} type='number' name='number' />
        fee : 0.3%
      </form>
    </div>
  );
}

export default Buy;
