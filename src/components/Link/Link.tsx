/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Link.module.scss';

function Link({ path }: { path: string }) {
  const history = useHistory();
  return (
    <li>
      <button
        type='button'
        className={styles.link}
        onClick={() => history.push(path)}
        onKeyPress={() => history.push(path)}
      >
        {path.slice(1)}
      </button>
    </li>
  );
}

export default Link;
