/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { TezosToolkit, MichelCodecPacker } from '@taquito/taquito';
import { SigningType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { char2Bytes } from '@taquito/utils';
import BaseApi from './index';

const tezos = new TezosToolkit('https://rpc.tzbeta.net');
tezos.setPackerProvider(new MichelCodecPacker());
const wallet = new BeaconWallet({ name: 'some name' });
tezos.setWalletProvider(wallet);

function signinformat(input, date) {
  const payloadString = `Tezos Signed Message: ${input} ${(
    date || new Date()
  ).toISOString()}`;
  const payloadLength = payloadString.length.toString(16).padStart(8, 0);
  return `${payloadLength}${char2Bytes(payloadString)}`;
}

export default class User extends BaseApi {
  async getWalletAddress() {
    try {
      const userActiveAccount = await wallet.client.getActiveAccount();
      let address = null;
      if (userActiveAccount) {
        address = await wallet.getPKH();
      }
      return Promise.resolve(address);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  async authenticate() {
    try {
      const sourceAddress = await this.connectWallet;
      const payload = signinformat(sourceAddress, new Date());
      const { signature } = await wallet.client.requestSignPayload({
        signingType: SigningType.MICHELINE,
        payload,
        sourceAddress,
      });
      console.log('ignature', signature);
      /* 
      запрос на Бэк с подписью кошелька
      await api.authenticate({
        address: sourceAddress,
        payload,
        signature,
      });
      */
      return Promise.resolve(signature);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  async connectWallet() {
    let activeAccount = await wallet.client.getActiveAccount();
    console.log('activeAccount', activeAccount);
    try {
      if (!activeAccount) {
        await this.disconnectWallet();
        await wallet.requestPermissions({ network: { type: 'mainnet' } });
        activeAccount = await wallet.client.getActiveAccount();
        if (!activeAccount) {
          throw new Error('Wallet not connected');
        }
      }
      const address = await wallet.getPKH();
      return Promise.resolve(address);
    } catch (err) {
      console.error(err);
      await this.disconnectWallet();
      return Promise.reject(err);
    }
  }

  async disconnectWallet() {
    await wallet.clearActiveAccount();
  }
}
