import React, { ReactChildren } from 'react';
import styles from './Title.module.scss';

function Title({
  children,
  size,
}: {
  children: ReactChildren | string;
  size: number;
}) {
  switch (size) {
    case 2:
      return <h2 className={styles.title}>{children}</h2>;

    case 3:
      return <h3 className={styles.subtitle}>{children}</h3>;

    default:
      return <h2 className={styles.title}>{children}</h2>;
  }
}

export default Title;
