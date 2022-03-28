import React from 'react';

import Increase from '../../components/Increase';
import styles from './Billing.module.scss';

function Billing() {
  return (
    <div className={styles.billing__body}>
      <Increase />
    </div>
  );
}

export default Billing;
