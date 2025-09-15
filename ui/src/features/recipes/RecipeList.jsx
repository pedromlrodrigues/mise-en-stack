import Box from '@mui/material/Box';

import RecipeCard from './RecipeCard';

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
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </Box>
  );
}

export default RecipeList;
