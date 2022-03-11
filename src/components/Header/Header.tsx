/* eslint-disable no-console */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import headerLogo from '../../imgs/title.png';
import { useWalletContext } from '../../contexts/WalletContext/WalletContext';
import LinkComponent from '../LinkComponent';
import BurgerBtn from '../BurgerBtn';

function Header() {
  const { auth, getAuth } = useWalletContext();
  const history = useHistory();

  const [showNav, setShowNav] = useState(false);
  const navClass = showNav
    ? `${styles.header__nav} ${styles.header__show}`
    : styles.header__nav;

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
      <BurgerBtn onClick={() => setShowNav(!showNav)} show={showNav} />
      <nav className={navClass}>
        <LinkComponent path='/summary' />
        <LinkComponent path='/billing' />
      </nav>
      <button
        type='button'
        className={styles.header__login}
        onClick={() => handler()}
        onKeyPress={() => handler()}
      >
        {auth ? 'logout' : 'login'}
      </button>
    </header>
  );
}

export default Header;
