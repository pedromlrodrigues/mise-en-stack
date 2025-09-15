import Box from '@mui/material/Box';

import RecipeCardSkeleton from './RecipeCardSkeleton';

function RecipeListSkeleton({ count = 10 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${count / 2}, 1fr)`,
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </Box>
  );
}

export default RecipeListSkeleton;
