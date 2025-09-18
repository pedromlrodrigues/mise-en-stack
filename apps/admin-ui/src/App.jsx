import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Box, CircularProgress, Typography, Button } from '@mui/material';

import Header from './components/Header/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage.jsx';
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx';

const RootRedirect = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          A carregar...
        </Typography>
      </Box>
    );
  }

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/recipes" replace />;
  }

  return <LoginPage />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
            </Route>
            <Route
              path="*"
              element={
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>
                  404 Not Found
                </Typography>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
