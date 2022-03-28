/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.scss';

import Form from '../Form';
import Title from '../Title';

const fields = [
  {
    name: 'username',
    type: 'type',
  },
  {
    name: 'password',
    type: 'password',
  },
];

const rules = yup.object({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
});

function Login() {
  const history = useHistory();

  return (
    <div className={styles.login}>
      <Title size={20}>LOGIN</Title>

      <Form rules={rules} callback={() => console.log(1)} fields={fields}>
        <span className={styles.login__li}>
          already have an account{' '}
          <button
            type='button'
            className={styles.login__link}
            onClick={() => history.push('/home/sign-up')}
          >
            sign up
          </button>
        </span>
      </Form>
    </div>
  );
}

export default Login;
