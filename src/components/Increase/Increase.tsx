/* eslint-disable spaced-comment */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable one-var */
/* eslint-disable no-unused-vars */

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';

import styles from './Increase.module.scss';

const contractAddressParam = 'KT1B6WTvKkSZmW2882VVwQKuoxf2ubUoqgNZ';
const contractAddress = 'KT1LmBK9q9KqpqCPdXuFWMYzB7a2RXaq4Htn';

const network = NetworkType.HANGZHOUNET;
const rpcUrl = 'https://hangzhounet.api.tez.ie';
const wallet = new BeaconWallet({ network, name: 'Vovchanchyck' });
let userAddress, userBalance;
const Tezos = new TezosToolkit(rpcUrl);

function Increase() {

  let userAddress;
  const connect = async () => {
    try {
      await wallet.requestPermissions({ network: { type: network } });
      
      const activeAccount = await wallet.client.getActiveAccount();
      Tezos.setWalletProvider(wallet);

      userAddress = await wallet.getPKH()
      console.log(userAddress)
      console.log(Tezos.signer);
    } catch (error) {
      console.log(error);
    }
  };
  const params = []
  const showContract = async () => {
    try {
      const contract = await Tezos.wallet.at(contractAddress);
      //const updateOperators 
      
       const op = await contract.methods.approve( contractAddressParam, 20).send({fee: 10000});
      // const op = await contract.methods.
      await op.confirmation(3);
      console.log(op)
    } catch (error) {
      console.log(error);
    } finally {
      console.log(1);
    }
  };

  return (
    <div className={styles.increase}>
      <h3 className={styles.increase__title}>increase a balance</h3>

      <form action='#' className={styles.increase__form}>
        <input className={styles.increase__input} type='number' name='number' />
        <span>left: 00</span>
        fee : 0.3%
        <button type='button' onClick={() => connect()}>
          connect{' '}
        </button>
        <button type='button' onClick={() => showContract()}>
          {' '}
          push me
        </button>
      </form>
    </div>
  );
}

export default Increase;
