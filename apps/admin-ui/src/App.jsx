import Header from './components/Header/Header.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <AuthProvider>
      <Header />
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
