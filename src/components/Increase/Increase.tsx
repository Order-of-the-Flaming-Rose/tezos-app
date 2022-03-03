/* eslint-disable object-shorthand */
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

const sendContractAddress = 'KT1B6WTvKkSZmW2882VVwQKuoxf2ubUoqgNZ';
const approveContractAddress = 'KT1LmBK9q9KqpqCPdXuFWMYzB7a2RXaq4Htn';

const network = NetworkType.HANGZHOUNET;
const rpcUrl = 'https://hangzhounet.api.tez.ie';
const wallet = new BeaconWallet({preferredNetwork: network, name: 'some name' });
const Tezos = new TezosToolkit(rpcUrl);
let activeAccount 
function Increase() {

  let activeAccount:any

  const approve = async () => {

    try {

      if(!activeAccount){
        await wallet.requestPermissions({ network: { type: network } });
      
        activeAccount = await wallet.client.getActiveAccount();
        Tezos.setWalletProvider(wallet);
      }

      const approve = await Tezos.wallet.at(approveContractAddress);
      const firstOp = await approve.methods.approve( sendContractAddress, 0).send({fee: 10000});
      await firstOp.confirmation(3);    
      console.log(firstOp);

    } catch (error) {
      console.log(error); 
    }
  };

  const send = async () => {
    try {
      if(!activeAccount){
        if(!activeAccount){
          await wallet.requestPermissions({ network: { type: network } });  
          activeAccount = await wallet.client.getActiveAccount();
          Tezos.setWalletProvider(wallet);
        }

      }

      const send = await Tezos.wallet.at(sendContractAddress);
      const secondOp = await send.methods.send(0).send({fee: 10000});
      await secondOp.confirmation(3);

    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className={styles.increase}>
      <h3 className={styles.increase__title}>increase a balance</h3>

      <form action='#' className={styles.increase__form}>
        <input className={styles.increase__input} type='number' name='number' />
        <span>left: 00</span>
        fee : 0.3%
        <button type='button' className={styles.increase__btn} onClick={() => approve()}>
          approve{' '}
        </button>
        <button type='button' className={styles.increase__btn} onClick={() => send()}>
          send{' '}
        </button>
      </form>
    </div>
  );
}

export default Increase;
