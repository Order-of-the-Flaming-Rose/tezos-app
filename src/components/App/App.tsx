import { BrowserRouter as Router } from 'react-router-dom';
import ActivityProvider from '../../contexts/ActivityContext';
import { AuthProvider } from '../../contexts/AuthContext';
import AppRouter from '../../route/AppRouter';
import '../../styles/index.scss';
import Header from '../Header';

function App() {
  return (
    <Router>
      <ActivityProvider>
        <AuthProvider>
          <div className='App'>
            <Header />
            <AppRouter />
          </div>
        </AuthProvider>
      </ActivityProvider>
    </Router>
  );
}

export default App;
