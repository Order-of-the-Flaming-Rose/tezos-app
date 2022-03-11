import React from 'react';
import styles from './BurgerBtn.module.scss';

function BurgerBtn({ show, onClick }: { show: boolean; onClick: () => void }) {
  const iconClass = !show
    ? styles.btn__icon
    : `${styles.btn__icon} ${styles.btn__cross}`;

  return (
    <button type='button' className={styles.btn} onClick={onClick}>
      <span className={iconClass} />
    </button>
  );
}

export default BurgerBtn;
