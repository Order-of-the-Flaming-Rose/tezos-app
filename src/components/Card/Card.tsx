import React from 'react';
import styles from './Card.module.scss';

type props = {
  children: React.ReactNode;
};

function Card({ children }: props) {
  return <div className={styles.card}>{children}</div>;
}

export default Card;
