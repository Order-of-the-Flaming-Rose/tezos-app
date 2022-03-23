/* eslint-disable no-console */
import * as yup from 'yup';
import React from 'react';
import styles from './Invite.module.scss';
import SingleForm from '../Form/InviteForm';

export type TInput = {
  [key: string]: string;
};
const initialTelegram: TInput = {
  telegram: '',
};
const initialDiscord: TInput = {
  discord: '',
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
        {!telegram ? (
          <a
            href='https://t.me/bokserskayapravda'
            target='_blank'
            rel='noreferrer'
          >
            {telegram}
          </a>
        ) : (
          <SingleForm
            init={initialTelegram}
            rules={ruleTelegram}
            name='telegram'
          />
        )}
        {!discord ? (
          <a
            href='https://t.me/bokserskayapravda'
            target='_blank'
            rel='noreferrer'
          >
            {discord}
          </a>
        ) : (
          <SingleForm
            init={initialDiscord}
            rules={ruleDiscord}
            name='discord'
          />
        )}
      </div>
    </div>
  );
}

export default Invite;
