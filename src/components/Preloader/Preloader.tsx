import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Preloader.module.scss';

function Preloader() {
  return (
    <div className={styles.preloader}>
      <ThreeDots color='grey' width='80px' height={20} />
    </div>
  );
}

export default Preloader;
