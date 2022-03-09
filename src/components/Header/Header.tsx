import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';
import headerLogo from '../../imgs/title.png';

function Header() {
  const history = useHistory();
  const [showNav, setShowNav] = useState(false);
  const navClass = showNav
    ? `${styles.header__nav} ${styles.show}`
    : styles.header__nav;

  const iconClass = !showNav
    ? styles.header__icon
    : `${styles.header__icon} ${styles.cross}`;

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
      <nav className={navClass}>
        <li className={styles.header__link}>
          <button
            type='button'
            className={styles.header__link}
            onClick={() => history.push('/billing')}
            onKeyPress={() => history.push('/billing')}
          >
            billing
          </button>
        </li>

        <li className={styles.header__link}>
          <button
            type='button'
            className={styles.header__link}
            onClick={() => history.push('/summary')}
            onKeyPress={() => history.push('/summary')}
          >
            summary
          </button>
        </li>
        <li className={styles.header__link}>
          <button
            type='button'
            className={styles.header__link}
            onClick={() => history.push('/home/login')}
            onKeyPress={() => history.push('/home/login')}
          >
            log in
          </button>
        </li>
      </nav>
    </header>
  );
}

export default Header;
