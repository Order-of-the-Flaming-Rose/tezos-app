import React from 'react';
import styles from './Increase.module.scss';

function Increase() {
  return (
    <div className={styles.increase}>
      <h3 className={styles.increase__title}>increase a balance</h3>

      <form action='#' className={styles.increase__form}>
        <input className={styles.increase__input} type='number' name='number' />
        <span>left: 00</span>
        fee : 0.3%
      </form>
    </div>
  );
}

export default Increase;
