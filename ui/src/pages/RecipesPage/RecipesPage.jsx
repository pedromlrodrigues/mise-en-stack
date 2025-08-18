import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchRecipes } from '../../api/recipeApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './RecipesPage.module.css';

function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('search') || '';

  const handleSearchSubmit = (newSearchTerm) => {
    setSearchParams({ search: newSearchTerm });
  };

  useEffect(() => {
    if (!searchTerm) {
      setRecipes([]);
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchRecipes(searchTerm);
        setRecipes(data.data);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <>
      <main className={styles.mainContent}>
        <SearchBar initialValue={searchTerm} onSubmit={handleSearchSubmit} />
      </main>
    </>
  );
}
export default RecipesPage;
