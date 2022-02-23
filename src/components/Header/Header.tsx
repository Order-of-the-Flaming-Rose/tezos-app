import React, { useState } from 'react';
import styles from './Header.module.scss';
import headerLogo from '../../imgs/title.png';

function Header() {
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
        <li className={styles.header__link}>billing</li>
        <li className={styles.header__link}>summary</li>
        <li className={styles.header__link}>log in</li>
      </nav>
    </header>
  );
}

export default Header;
