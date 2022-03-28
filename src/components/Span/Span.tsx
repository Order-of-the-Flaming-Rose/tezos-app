import React from 'react';
import styles from './Span.module.scss';

function Span({ children }: { children: React.ReactNode | string }) {
  return <span className={styles.span}>{children}</span>;
}

export default Span;
