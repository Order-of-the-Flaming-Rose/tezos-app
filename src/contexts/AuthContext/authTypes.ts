import React from 'react';

export type TAuthValue = {
  telegram: string;
  discord: string;
  wallet: string;
  step: number;
};

export type TPayload = {
  discord?: string;
  telegram?: string;
  wallet?: string;
  step?: number;
};

export type TActionAuth = {
  payload: TPayload;
  type: string;
};

export type TAuthContextValue = {
  state: TAuthValue;
  dispatch: React.Dispatch<TActionAuth>;
};

export const GETWALLET = 'GETWALLET';
export const GETFORM = 'GETFORM';
export const STEPBACK = 'STEPBACK';
