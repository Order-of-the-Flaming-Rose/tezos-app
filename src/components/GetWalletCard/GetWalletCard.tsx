/* eslint-disable no-alert */
import { useAuthContext } from '../../contexts/AuthContext/AuthContext';
import { GETWALLET, STEPBACK } from '../../contexts/AuthContext/authTypes';
import styles from './GetWalletCard.module.scss';

function GetWalletCard() {
  const { dispatch } = useAuthContext();

  const handler = () => {
    const key = prompt();
    dispatch({
      type: GETWALLET,
      payload: { wallet: key || 'default option' },
    });
  };

  return (
    <div className={styles.getwalletcard}>
      <button
        className={styles.getwalletcard__back}
        type='button'
        onClick={() => dispatch({ type: STEPBACK, payload: { step: 1 } })}
      >
        step back
      </button>
      <button
        className={styles.getwalletcard__btn}
        type='button'
        onClick={() => handler()}
      >
        connect wallet
      </button>
    </div>
  );
}

export default GetWalletCard;
