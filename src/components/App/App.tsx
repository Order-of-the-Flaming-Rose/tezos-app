import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../../route/AppRouter';
import '../../styles/index.scss';
import Header from '../Header';
import styles from './App.module.scss';
import { WalletProvider } from '../../contexts/WalletContext';
import { OperationsProvider } from '../../contexts/OperationsContext';

function App() {
  return (
    <Router>
      <WalletProvider>
        <OperationsProvider>
          <div className={styles.app}>
            <Header />
            <AppRouter />
          </div>
        </OperationsProvider>
      </WalletProvider>
    </Router>
  );
}

export default App;
