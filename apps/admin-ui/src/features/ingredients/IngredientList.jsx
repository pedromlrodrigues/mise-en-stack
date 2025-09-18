import Box from '@mui/material/Box';

import IngredientCard from './IngredientCard';

function IngredientList({ ingredients, onIngredientClick }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: 3,
      }}
    >
      {ingredients.map((ingredient) => (
        <IngredientCard
          ingredient={ingredient}
          key={ingredient.id}
          onIngredientClick={() => onIngredientClick(ingredient.id)}
        />
      ))}
    </Box>
  );
}

export default IngredientList;
