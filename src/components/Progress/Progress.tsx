import React from 'react';
import styles from './Progress.module.scss';

function Progress() {
  return (
    <div className={styles.progress}>
      <div className={styles.progress__message}>
        please dont leave the page till the transaction finish
      </div>
      <div className={styles.progress__bar} />
    </div>
  );
}

export default Progress;
