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

type TFormValues = {
  username: string;
  password: string;
  ['confirm password']: string;
  wallet: string;
};
const initialValues: TFormValues = {
  username: '',
  password: '',
  'confirm password': '',
  wallet: '',
};

function SignUp() {
  const history = useHistory();

  const { walletAddress, getWallet } = useWalletContext();
  console.log(walletAddress);

  const validateRules = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    'confirm password': yup.string().required(),
    wallet: yup.string().test(() => {
      return !!walletAddress;
    }),
  });

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
          {Object.entries(initialValues).map((field) =>
            field[0] === 'wallet' ? true : <Input name={field[0]} />,
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
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
