/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext/AuthContext';
import { STEPBACK } from '../../contexts/AuthContext/authTypes';
import styles from './SendCard.module.scss';

function SendCard() {
  const { state, dispatch } = useAuthContext();

  const list = Object.entries(state);
  list.pop();

  return (
    <div className={styles.sendcard}>
      <div className={styles.sendcard__container}>
        <span className={styles.sendcard__title}>confirm and send</span>

        <ul className={styles.sendcard__list}>
          {list.map((val) => {
            return (
              <li className={styles.sendcard__item}>
                <span className={styles.sendcard__name}>{val[0]} :</span>
                <span className={styles.sendcard__value} title={String(val[1])}>
                  {val[1]}
                </span>
              </li>
            );
          })}
        </ul>

        <div className={styles.sendcard__footer}>
          <button
            className={styles.sendcard__btn}
            type='submit'
            onClick={() => dispatch({ type: STEPBACK, payload: { step: 2 } })}
          >
            back
          </button>
          <button className={styles.sendcard__btn} type='submit'>
            send data
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendCard;
