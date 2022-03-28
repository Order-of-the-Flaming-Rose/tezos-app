/* eslint-disable no-console */
import React, { useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Field } from 'formik';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';
import styles from './SignUp.module.scss';
import { API } from '../../api';
import Form from '../Form';
import Button from '../Button';
import Title from '../Title';

const network = NetworkType.HANGZHOUNET;
const rpcUrl = 'https://hangzhounet.api.tez.ie';
const wallet = new BeaconWallet({
  preferredNetwork: network,
  name: 'some name',
});
const Tezos = new TezosToolkit(rpcUrl);

type TFormValues = {
  email: string;
  password: string;
  ['confirm password']: string;
  address: string;
};

function SignUp() {
  const history = useHistory();
  const [walletAddress, setWalletAddress] = useState('');

  const getWallet = async () => {
    await wallet.requestPermissions({ network: { type: network } });

    const activeAccount = await wallet.client.getActiveAccount();
    Tezos.setWalletProvider(wallet);
    console.log(activeAccount);
    const val = activeAccount?.address;
    setWalletAddress(val || '');
  };

  const fields = [
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'password',
      type: 'password',
    },
    {
      name: 'confirm password',
      type: 'password',
    },
    {
      name: 'address',
      type: 'text',
      render() {
        return (
          <Field name='address'>
            {({ meta, field }: any) => (
              <>
                <Button onClick={() => getWallet()}>GET WALLET</Button>
                {meta.touched && meta.error && (
                  <span className={styles.signup__error}>{meta.error}</span>
                )}
              </>
            )}
          </Field>
        );
      },
    },
  ];

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
      <Title size={20}>SIGN UP</Title>
      <Form rules={validateRules} callback={formSubmit} fields={fields}>
        <span className={styles.signup__li}>
          already have an account{' '}
          <button
            type='button'
            className={styles.signup__link}
            onClick={() => history.push('/home/login')}
          >
            login
          </button>
        </span>
      </Form>
    </div>
  );
}

export default SignUp;
