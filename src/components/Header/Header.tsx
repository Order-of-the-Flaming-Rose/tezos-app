/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import headerLogo from '../../imgs/title.png';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';

function Header() {
  const { auth, getAuth } = useWalletContext();
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  const page = location.pathname.split('/')[1];

  const [showNav, setShowNav] = useState(false);
  const navClass = showNav
    ? `${styles.header__nav} ${styles.show}`
    : styles.header__nav;

  const iconClass = !showNav
    ? styles.header__icon
    : `${styles.header__icon} ${styles.cross}`;

  const handler = () => {
    if (auth) {
      getAuth(false);
      history.push('/home/login');
    }
    history.push('/home/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img
          src={headerLogo}
          className={styles.header__logo}
          alt='header logo'
        />
      </div>
      <button
        type='button'
        className={styles.header__btn}
        onClick={() => setShowNav(!showNav)}
      >
        <span className={iconClass} />
      </button>
      {auth ? (
        <nav className={navClass}>
          <li>
            <button
              type='button'
              className={styles.header__link}
              onClick={() => history.push('/billing')}
              onKeyPress={() => history.push('/billing')}
            >
              billing
            </button>
          </li>

          <li>
            <button
              type='button'
              className={styles.header__link}
              onClick={() => history.push('/summary')}
              onKeyPress={() => history.push('/summary')}
            >
              summary
            </button>
          </li>
        </nav>
      ) : null}

      {page !== 'home' ? (
        <button
          type='button'
          className={styles.header__connect}
          onClick={() => handler()}
          onKeyPress={() => handler()}
        >
          {auth ? 'logout' : 'login'}
        </button>
      ) : null}
    </header>
  );
}

export default Header;
