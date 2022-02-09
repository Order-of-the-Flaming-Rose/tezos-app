import { AuthProvider } from '../../contexts/AuthContext';
import '../../styles/index.scss';
import Header from '../Header';
import Main from '../Main';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </AuthProvider>
  );
}

export default App;
