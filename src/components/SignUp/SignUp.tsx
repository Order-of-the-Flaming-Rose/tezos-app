/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Input from '../Input';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import { API } from '../../api';

type TFormValues = {
  email: string;
  password: string;
  ['confirm password']: string;
  address: string;
};
const initialValues: TFormValues = {
  email: '',
  password: '',
  'confirm password': '',
  address: '',
};

function SignUp() {
  const history = useHistory();

  const { walletAddress, getWallet } = useWalletContext();
  console.log(walletAddress);

  const validateRules = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    'confirm password': yup.string().required(),
    address: yup.string().test(() => {
      return !!walletAddress;
    }),
  });

  const formSubmit = (values: TFormValues) => {
    const { email, password } = values;
    API.signUP({ email, password, address: walletAddress })
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
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
          {Object.entries(initialValues).map((field) =>
            field[0] === 'address' ? true : <Input name={field[0]} />,
          )}

          <Field name='wallet'>
            {({ meta, field }: any) => (
              <>
                <button
                  type='button'
                  className={styles.signup__btn}
                  onClick={() => getWallet()}
                >
                  get wallet
                </button>
                {meta.touched && meta.error && (
                  <span className={styles.signup__error}>{meta.error}</span>
                )}
              </>
            )}
          </Field>
          <input type='submit' className={styles.signup__btn} />
          <span className={styles.signup__li}>
            already have an account{' '}
            <button
              className={styles.signup__link}
              onClick={() => history.push('/home/login')}
            >
              sign up
            </button>
          </span>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
