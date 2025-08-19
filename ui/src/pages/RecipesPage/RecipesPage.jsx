import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchRecipes } from '../../api/recipeApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCardSkeleton from '../../features/recipes/RecipeCardSkeleton';
import ResultsFooter from '../../features/recipes/ResultsFooter';
import RecipeList from '../../features/recipes/RecipeList';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
        const data = await searchRecipes(searchTermFromUrl);
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

      <Box className={styles.resultsContainer}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && (
          <Grid container spacing={4}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RecipeCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}
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
        {!loading && !error && recipes.length === 0 && searchTermFromUrl && (
          <Typography>No recipes found for "{searchTermFromUrl}".</Typography>
        )}
      </Box>
    </Box>
  );
}
export default RecipesPage;
