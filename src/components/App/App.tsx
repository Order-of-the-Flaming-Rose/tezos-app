import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../../route/AppRouter';
import '../../styles/index.scss';
import Header from '../Header';
import styles from './App.module.scss';
import WalletProvider from '../../contexts/WalletContext';

function App() {
  return (
    <Router>
      <WalletProvider>
        <div className={styles.app}>
          <Header />
          <AppRouter />
        </div>
      </WalletProvider>
    </Router>
  );
}

export default App;
