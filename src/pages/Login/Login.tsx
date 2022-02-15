/* eslint-disable no-console */
import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.scss';
import Input from '../../components/Input';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';

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
  const history = useHistory();
  const { getAuth } = useWalletContext();
  const formSubmit = (values: TFormValues) => {
    console.log(values);
    getAuth(true);
    history.push('/home');
  };

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
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
