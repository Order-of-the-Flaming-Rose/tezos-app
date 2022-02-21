/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useLocation, useHistory } from 'react-router-dom';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Header.module.scss';
import { API } from '../../api';

function Header() {
  const { auth, getWallet } = useWalletContext();
  const location = useLocation();
  const history = useHistory();
  const handleMe = async () => {
    API.me();
  };

  const button =
    auth && location.pathname === '/summary' ? (
      <button type='button' className={styles.button}>
        log out
      </button>
    ) : auth ? (
      <button
        type='button'
        className={styles.button}
        onClick={() => {
          getWallet();
        }}
      >
        wallet
      </button>
    ) : location.pathname === '/login' ? (
      <button
        type='button'
        className={styles.button}
        onClick={() => history.push('/sign-up')}
      >
        sign up
      </button>
    ) : (
      <button
        type='button'
        className={styles.button}
        onClick={() => history.push('/login')}
      >
        login
      </button>
    );

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Орден Пылающей Розы</h2>
      <button type='button' onClick={handleMe}>
        push me
      </button>

      {button}
    </header>
  );
}

export default Header;
