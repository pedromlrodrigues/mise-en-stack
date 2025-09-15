import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import RecipesPage from './pages/RecipesPage/RecipesPage.jsx';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage.jsx';

import Header from './components/Header/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
