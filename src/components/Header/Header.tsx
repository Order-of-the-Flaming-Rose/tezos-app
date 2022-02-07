import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <button type='button' className={styles.button}>
        connect your wallet
      </button>
    </header>
  );
}

export default Header;
