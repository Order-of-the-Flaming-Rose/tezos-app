import { BrowserRouter as Router } from 'react-router-dom';
import ActivityProvider from '../../contexts/ActivityContext';
import { AuthProvider } from '../../contexts/AuthContext';
import AppRouter from '../../route/AppRouter';
import '../../styles/index.scss';
import Header from '../Header';
import styles from './App.module.scss';

function App() {
  return (
    <Router>
      <ActivityProvider>
        <AuthProvider>
          <div className={styles.app}>
            <Header />
            <AppRouter />
          </div>
        </AuthProvider>
      </ActivityProvider>
    </Router>
  );
}

export default App;
