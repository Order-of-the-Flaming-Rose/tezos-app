/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useLocation, useHistory } from 'react-router-dom';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import styles from './Header.module.scss';

function Header() {
  const { auth } = useWalletContext();
  const location = useLocation();
  const history = useHistory();

  const button =
    auth && location.pathname === '/summary' ? (
      <button type='button' className={styles.button}>
        log out
      </button>
    ) : auth ? (
      <button
        type='button'
        className={styles.button}
        onClick={() => history.push('/summary')}
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

      {button}
    </header>
  );
}

export default Header;
