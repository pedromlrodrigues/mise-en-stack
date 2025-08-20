import RecipeCard from './RecipeCard';
import Box from '@mui/material/Box';

function RecipeList({ recipes }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 3,
      }}
    >
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} />
      ))}
    </Box>
  );
}

export default RecipeList;
