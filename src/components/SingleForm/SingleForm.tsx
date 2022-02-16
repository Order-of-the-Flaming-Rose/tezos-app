/* eslint-disable no-console */
import React from 'react';
import { Form, Formik } from 'formik';
import Input from '../Input';
import { TInput } from '../Invite/Invite';
import styles from './SingleForm.module.scss';

type TProps = {
  init: TInput;
  rules: any;
};

function SingleForm({ init, rules }: TProps) {
  const formHandler = (val: TInput) => console.log(val);

  return (
    <Formik
      initialValues={init}
      validationSchema={rules}
      onSubmit={formHandler}
    >
      <Form className={styles.form}>
        <Input name='telegram' />
        <input type='submit' className={styles.form__submit} />
      </Form>
    </Formik>
  );
}

export default SingleForm;
