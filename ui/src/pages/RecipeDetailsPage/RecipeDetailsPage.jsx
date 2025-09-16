import { useState, useEffect } from 'react';

import { useParams, useNavigate, useLocation } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { getRecipeById } from '../../api/recipeApi';
import recipeImageDefault from '../../assets/recipe-image-default.png';
import RecipeDetailsSkeleton from '../../features/recipes/RecipeDetailsSkeleton';

function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleGoBack = () => {
    const prevSearch = location.state?.prevSearch || '';
    navigate(`/recipes${prevSearch}`); // Navigate back to /recipes with the saved search params
  };

  if (loading) return <RecipeDetailsSkeleton />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <Box sx={{ p: 3, maxWidth: '90vw', width: '100%', mx: 'auto' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ mb: 3 }}>
        Voltar a Receitas
      </Button>
      <Typography variant="h3" component="h1" gutterBottom>
        {recipe.name}
      </Typography>
      <Box
        component="img"
        src={recipe.photoUrl || recipeImageDefault}
        alt={recipe.name}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 3,
        }}
      />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Ingredientes
          </Typography>
          <List>
            {recipe.ingredientSections.map((section, sectionIndex) => (
              <Box key={sectionIndex} sx={{ paddingBottom: '2rem' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {section.title}
                </Typography>
                <List disablePadding>
                  {section.ingredients.map((ingredient, ingredientIndex) => (
                    <ListItem key={ingredientIndex} disablePadding>
                      <ListItemText
                        primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Instruções
          </Typography>
          <List>
            {recipe.preparationSections.map((section, sectionIndex) => (
              <Box key={sectionIndex} sx={{ paddingBottom: '2rem' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {section.title}
                </Typography>
                <List disablePadding>
                  {section.steps.map((step, stepIndex) => (
                    <ListItem key={stepIndex} disablePadding>
                      <ListItemText primary={`${stepIndex + 1}. ${step}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RecipeDetailsPage;
