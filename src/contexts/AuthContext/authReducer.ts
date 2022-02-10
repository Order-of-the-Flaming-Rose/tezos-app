/* eslint-disable no-debugger */
/* eslint-disable default-param-last */
import { initial } from './AuthContext';
import {
  GETFORM,
  GETWALLET,
  STEPBACK,
  TActionAuth,
  TAuthValue,
} from './authTypes';

export const authReducer = (
  state = initial,
  action: TActionAuth,
): TAuthValue => {
  debugger;
  if (action.type === GETWALLET) {
    const copy = { ...state };
    copy.wallet = action.payload.wallet!;
    copy.step = 3;
    return copy;
  }
  if (action.type === GETFORM) {
    const copy = { ...state };
    copy.telegram = action.payload.telegram!;
    copy.discord = action.payload.discord!;
    copy.step = 2;
    return copy;
  }
  if (action.type === STEPBACK) {
    const copy = { ...state };
    copy.step = action.payload.step!;
    return copy;
  }

  return state;
};
