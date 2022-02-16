/* eslint-disable no-console */
import * as yup from 'yup';
import React from 'react';
import styles from './Invite.module.scss';
import SingleForm from '../SingleForm';

export type TInput = {
  telegram: string;
};
const initialTelegram: TInput = {
  telegram: '',
};
const initialDiscord: TInput = {
  telegram: '',
};
const ruleTelegram = yup.object({
  telegram: yup.string().required(),
});

const ruleDiscord = yup.object({
  discord: yup.string().required(),
});

const telegram = 'telegram invite';
const discord = 'discord invite';
function Invite() {
  return (
    <div className={styles.invite}>
      Invite
      <div className={styles.invite__links}>
        {telegram ? (
          <a href='https://t.me/bokserskayapravda'>{telegram}</a>
        ) : (
          <SingleForm init={initialTelegram} rules={ruleTelegram} />
        )}
        {discord ? (
          <a href='https://t.me/bokserskayapravda'>{discord}</a>
        ) : (
          <SingleForm init={initialDiscord} rules={ruleDiscord} />
        )}
      </div>
    </div>
  );
}

export default Invite;
