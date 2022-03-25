/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import headerLogo from '../../imgs/title.png';

import LinkComponent from '../LinkComponent';
import BurgerBtn from '../BurgerBtn';
import userIcon from '../../imgs/user-svgrepo-com.svg';
import {
  useWalletDispatchContext,
  useWalletStateContext,
} from '../../contexts/WalletContext';

function Header() {
  const { auth } = useWalletStateContext();
  const { getAuth } = useWalletDispatchContext();
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

  const [small, setSmall] = useState(false);
  const navRef = useRef<HTMLElement | any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setSmall(window.pageYOffset > 50),
      );
    }
  }, []);

  const headerClass =
    small && showNav
      ? `${styles.header} ${styles.header__open}`
      : showNav && !small
      ? `${styles.header} ${styles.header__open}`
      : small && !showNav
      ? `${styles.header} ${styles.header__small}`
      : styles.header;

  const clickOutside = useCallback((e: MouseEvent): void => {
    if (navRef.current && !navRef.current?.contains(e.target)) {
      e.stopImmediatePropagation();
      setShowNav(false);
    }
  }, []);

  useEffect(() => {
    if (showNav) {
      document.addEventListener('click', clickOutside);
    } else {
      document.removeEventListener('click', clickOutside);
    }
  }, [showNav]);

  return (
    <header className={headerClass}>
      <div className={styles.header__logo}>
        <img
          src={headerLogo}
          className={styles.header__img}
          alt='header logo'
        />
      </div>

      <div className={styles.header__btn}>
        <BurgerBtn onClick={() => setShowNav(!showNav)} show={showNav} />
      </div>

      <nav className={navClass} ref={navRef}>
        <LinkComponent path='/summary' />
        <LinkComponent path='/billing' />
      </nav>

      <button
        type='button'
        className={styles.header__login}
        onClick={() => handler()}
        onKeyPress={() => handler()}
      >
        <img src={userIcon} alt='' className={styles.header__icon} />
      </button>
    </header>
  );
}

export default Header;
