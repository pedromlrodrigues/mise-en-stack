import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { getRecipes } from '../../api/recipeApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeList from '../../features/recipes/RecipeList';
import RecipeListSkeleton from '../../features/recipes/RecipeListSkeleton';
import ResultsFooter from '../../features/recipes/ResultsFooter';

import styles from './RecipesPage.module.css';

function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTermFromUrl = searchParams.get('search');
  const pageFromUrl = searchParams.get('page');

  useEffect(() => {
    if (searchTermFromUrl === null || pageFromUrl === null) {
      setSearchParams(
        { search: searchTermFromUrl || '', page: pageFromUrl || '1' },
        { replace: true }
      );
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipes(searchTermFromUrl);
        setRecipes(data.data);
        setPaginationInfo(data.pagination);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [searchTermFromUrl, pageFromUrl, setSearchParams]);

  const handlePageChange = (_, value) => {
    setSearchParams({ search: searchTermFromUrl, page: value });
  };

  const handleSearchSubmit = (newSearchTerm) => {
    setSearchParams({ search: newSearchTerm, page: 1 });
  };

  return (
    <Box className={styles.mainContent}>
      <SearchBar initialValue={searchTermFromUrl} onSubmit={handleSearchSubmit} />
      {!loading && !error && recipes.length === 0 && searchTermFromUrl && (
        <Typography sx={{ marginTop: '2rem' }}>
          No recipes found for "{searchTermFromUrl}".
        </Typography>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box className={styles.resultsContainer}>
        {loading && <RecipeListSkeleton />}
        {!loading && !error && (
          <>
            <RecipeList recipes={recipes} />
            <Box className={styles.resultsFooter}>
              <ResultsFooter paginationInfo={paginationInfo} dataLength={recipes.length} />
              {paginationInfo.totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                  <Pagination
                    count={paginationInfo.totalPages}
                    page={pageFromUrl}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}></Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
export default RecipesPage;
