import React from 'react';
import styles from './Button.module.scss';

type TProps = {
  children: string;
  onClick: () => void | any;
};

function Button({ children, onClick }: TProps) {
  return (
    <button type='button' onClick={() => onClick()} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
