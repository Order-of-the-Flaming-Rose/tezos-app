import styles from './Main.module.scss';
import Auth from '../Auth';

export default function Main() {
  return (
    <div className={styles.main}>
      <Auth />
    </div>
  );
}
