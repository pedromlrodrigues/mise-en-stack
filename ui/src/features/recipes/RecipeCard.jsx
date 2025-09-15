import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import recipeImageDefault from '../../assets/recipe-image-default.png';

function RecipeCard({ recipe }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={`/recipes/${recipe.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.photoUrl || recipeImageDefault}
          alt={recipe.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {recipe.name}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {recipe.keywords?.join(', ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeCard;
