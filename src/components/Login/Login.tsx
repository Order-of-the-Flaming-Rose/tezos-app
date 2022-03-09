/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.scss';
import Input from '../Input';
import { API } from '../../api';

type TFormValues = {
  username: string;
  password: string;
};
const initialValues: TFormValues = {
  username: '',
  password: '',
};
const validateRules = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const formSubmit = (values: TFormValues) => {
    const { username, password } = values;
    console.log(values);
    API.singIn({ email: username, password })
      .then((data) => {
        localStorage.setItem('token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
      })
      .catch((e) => console.log(e));
  };
  console.log(localStorage.getItem('token'));

  const history = useHistory();
  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Log in</h2>

      <Formik
        onSubmit={formSubmit}
        initialValues={initialValues}
        validationSchema={validateRules}
      >
        <Form className={styles.login__form}>
          {Object.entries(initialValues).map((field) => (
            <Input name={field[0]} />
          ))}
          <input type='submit' className={styles.login__btn} />
          <span className={styles.login__li}>
            already have an account{' '}
            <button
              className={styles.login__link}
              onClick={() => history.push('/home/sign-up')}
            >
              sign up
            </button>
          </span>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
