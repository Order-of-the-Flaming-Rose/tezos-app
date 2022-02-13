import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import AppRouter from '../../route/AppRouter';
import '../../styles/index.scss';
import Header from '../Header';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Header />
          <AppRouter />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
