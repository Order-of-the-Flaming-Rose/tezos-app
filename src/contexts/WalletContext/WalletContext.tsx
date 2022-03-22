/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';
import { useHistory } from 'react-router-dom';
import { TZKTService } from '../../api/tzktClient';
import { API } from '../../api';

const network = NetworkType.HANGZHOUNET;
const rpcUrl = 'https://hangzhounet.api.tez.ie';
const wallet = new BeaconWallet({
  preferredNetwork: network,
  name: 'some name',
});
const Tezos = new TezosToolkit(rpcUrl);

type TWalletContextValue = {
  isError: boolean;
  isLoading: boolean;

  balance: any;
  auth: boolean;

  getAuth: (val: boolean) => void;
  getBalance: () => void;
  getWallet: () => void;
  walletAddress: string;

  tokens: number | string;
  getSummary: () => void;
};

const defaultState: TWalletContextValue = {
  isError: false,
  isLoading: false,

  balance: null,
  auth: false,

  getAuth: () => undefined,
  getBalance: () => undefined,
  getWallet: () => undefined,
  walletAddress: '',

  tokens: 0,
  getSummary: () => undefined,
};

const WalletContext = createContext(defaultState);
export const useWalletContext = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error(
      'you are not into Provider of the contexts, make sure the component wrapped in the Provider',
    );
  }

  return ctx;
};

type TWalletProps = {
  children: React.ReactNode;
};
// walletAddress,

export function WalletProvider({ children }: TWalletProps) {
  // wallet address
  const [walletAddress, setWalletAddress] = useState(
    'tz1RB9RXTv6vpuH9WnyyG7ByUzwiHDHGqHzq',
  );

  // useEffect(() => {
  //   console.log(walletAddress);
  // }, [walletAddress]);
  const getWallet = async () => {
    await wallet.requestPermissions({ network: { type: network } });

    const activeAccount = await wallet.client.getActiveAccount();
    Tezos.setWalletProvider(wallet);
    console.log(activeAccount);
    const val = activeAccount?.address;
    setWalletAddress(val || '');
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState({});
  const [auth, setAuth] = useState(false);
  const [tokens, getTokens] = useState(0);

  const history = useHistory();

  // after login access runs getAuth func
  const getAuth = (val: boolean) => setAuth(val);

  // get balance during the summary page mount
  const getBalance = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const rec = await TZKTService.getAccount(walletAddress);
      const quote = await TZKTService.getCurrencyRate();
      const xtz = rec.data.balance;
      const {
        data: { quoteUsd },
      } = quote;
      const next = { xtz, quoteUsd };
      setBalance(next);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!walletAddress) return;
    const getTokensX = async () => {
      try {
        const rec = await TZKTService.getAllowance(walletAddress);
        const val = rec.data.value.balance;

        getTokens(val);
      } catch (error) {
        console.log(error);
      }
    };

    getTokensX();
  }, [walletAddress]);

  const getSummary = async () => {
    try {
      const rec = await API.me();

      const {
        data: {
          user: { address },
        },
      } = rec;
      setWalletAddress(address);
    } catch (error) {
      console.log(error);
      history.push('/billing');
    }
  };

  // context value data
  const contextValue = useMemo(
    () => ({
      isError,
      isLoading,
      // fetching,

      // auth
      auth,
      getAuth,

      // balance
      balance,
      getBalance,

      // get wallet to sign up

      // summary
      getSummary,
      getWallet,
      walletAddress,
      // part of summary
      tokens,
    }),
    [balance, walletAddress, auth, tokens],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}
