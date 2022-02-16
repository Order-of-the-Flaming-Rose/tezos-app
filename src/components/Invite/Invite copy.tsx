/* eslint-disable no-console */
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import Input from '../Input';
import styles from './Invite.module.scss';

type TTelegram = {
  telegram: string;
};
const initialTelegram: TTelegram = {
  telegram: '',
};
const ruleTelegram = yup.object({
  telegram: yup.string().required(),
});

const telegram = false;

function Invite() {
  return (
    <div className={styles.invite}>
      Invite
      <div className={styles.invite__links}>
        {telegram ? (
          <span>link telegram </span>
        ) : (
          <Formik
            initialValues={initialTelegram}
            validationSchema={ruleTelegram}
            onSubmit={(val) => console.log(val)}
          >
            <Form className={styles.invite__form}>
              <Input name='telegram' />
              <input type='submit' className={styles.invite__submit} />
            </Form>
          </Formik>
        )}
        {telegram ? (
          <span>link telegram </span>
        ) : (
          <Formik
            initialValues={initialTelegram}
            validationSchema={ruleTelegram}
            onSubmit={(val) => console.log(val)}
          >
            <Form className={styles.invite__form}>
              <Input name='discord' />
              <input type='submit' className={styles.invite__submit} />
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}

export default Invite;
