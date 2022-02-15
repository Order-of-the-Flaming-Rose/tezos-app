/* eslint-disable no-console */
import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Input from '../../components/Input';

type TFormValues = {
  username: string;
  password: string;
  ['confirm password']: string;
};
const initialValues: TFormValues = {
  username: '',
  password: '',
  'confirm password': '',
};
const validateRules = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  'confirm password': yup.string().required(),
});

function SignUp() {
  const history = useHistory();

  const formSubmit = (values: TFormValues) => {
    console.log(values);
    history.push('/home');
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles.signup__title}>Sign Up </h2>
      <Formik
        onSubmit={formSubmit}
        initialValues={initialValues}
        validationSchema={validateRules}
      >
        <Form className={styles.signup__form}>
          {Object.entries(initialValues).map((field) => (
            <Input name={field[0]} />
          ))}
          <input type='submit' className={styles.signup__btn} />
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
