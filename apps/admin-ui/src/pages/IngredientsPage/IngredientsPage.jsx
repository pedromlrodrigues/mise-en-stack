import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { getIngredients, getIngredientById } from '../../api/ingredientApi';
import ResultsFooter from '../../components/common/ResultsFooter';
import SearchBar from '../../components/common/SearchBar';
import IngredientDetails from '../../features/ingredients/IngredientDetails';
import IngredientList from '../../features/ingredients/IngredientList';
import RecipeListSkeleton from '../../features/recipes/RecipeListSkeleton';

import styles from './IngredientsPage.module.css';

function IngredientsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ingredients, setIngredients] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedIngredientDetails, setSelectedIngredientDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const searchTermFromUrl = searchParams.get('search');
  const pageFromUrl = searchParams.get('page');
  const limitFromUrl = searchParams.get('limit');

  useEffect(() => {
    if (searchTermFromUrl === null || pageFromUrl === null || limitFromUrl === null) {
      setSearchParams(
        { search: searchTermFromUrl || '', page: pageFromUrl || '1', limit: limitFromUrl || '10' },
        { replace: true }
      );
      return;
    }

    const fetchIngredients = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getIngredients(searchTermFromUrl, pageFromUrl, limitFromUrl);
        setIngredients(data.data);
        setPaginationInfo(data.pagination);
        setSearchParams(
          { search: searchTermFromUrl, page: pageFromUrl, limit: limitFromUrl },
          { replace: true }
        );
      } catch (err) {
        setError('Failed to load ingredients. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, [searchTermFromUrl, pageFromUrl, limitFromUrl, setSearchParams]);

  const handlePageChange = (_, value) => {
    setSearchParams({ search: searchTermFromUrl, page: value, limit: searchParams.get('limit') });
  };

  const handleSearchSubmit = (newSearchTerm) => {
    setSearchParams({ search: newSearchTerm, page: 1 });
  };

  const handleOpenIngredientDetails = async (ingredientId) => {
    setIsDetailsDrawerOpen(true);
    setIsDetailsLoading(true);
    setDetailsError(null);
    setSelectedIngredientDetails(null);

    try {
      const details = await getIngredientById(ingredientId);
      setSelectedIngredientDetails(details);
    } catch (err) {
      console.error('Failed to fetch ingredient details for drawer:', err);
      setDetailsError(err.response?.data?.message || 'Failed to load ingredient details.');
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleCloseDetailsDrawer = () => {
    setIsDetailsDrawerOpen(false);
    setSelectedIngredientDetails(null);
    setDetailsError(null);
  };

  const handleIngredientUpdated = (updatedIngredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) => (ing._id === updatedIngredient._id ? updatedIngredient : ing))
    );
    if (selectedIngredientDetails && selectedIngredientDetails._id === updatedIngredient._id) {
      setSelectedIngredientDetails(updatedIngredient);
    }
  };

  const handleIngredientDeleted = (deletedIngredientId) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => ing._id !== deletedIngredientId)
    );
    if (selectedIngredientDetails && selectedIngredientDetails._id === deletedIngredientId) {
      handleCloseDetailsDrawer();
    }
  };

  return (
    <Box className={styles.mainContent}>
      <SearchBar
        initialValue={searchTermFromUrl}
        onSubmit={handleSearchSubmit}
        itemNounPlural={'ingredients'}
      />
      {!loading && !error && ingredients.length === 0 && searchTermFromUrl && (
        <Typography sx={{ marginTop: '2rem' }}>
          No ingredients found for "{searchTermFromUrl}".
        </Typography>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box className={styles.resultsContainer}>
        {loading && <RecipeListSkeleton />}
        {!loading && !error && (
          <>
            <IngredientList
              ingredients={ingredients}
              onIngredientClick={handleOpenIngredientDetails}
            />
            <Box className={styles.resultsFooter}>
              <ResultsFooter
                paginationInfo={paginationInfo}
                dataLength={ingredients.length}
                itemNounPlural={'ingredients'}
              />
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
      <Drawer
        anchor="right"
        open={isDetailsDrawerOpen}
        onClose={handleCloseDetailsDrawer}
        slotProps={{
          paper: {
            sx: { width: { xs: '90%', sm: '450px', md: '550px' } },
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <IconButton onClick={handleCloseDetailsDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {isDetailsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {detailsError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {detailsError}
            </Alert>
          )}

          {!isDetailsLoading && !detailsError && selectedIngredientDetails && (
            <IngredientDetails
              ingredient={selectedIngredientDetails}
              onIngredientUpdated={handleIngredientUpdated}
              onIngredientDeleted={handleIngredientDeleted}
              onCloseDrawer={handleCloseDetailsDrawer}
            />
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
export default IngredientsPage;
