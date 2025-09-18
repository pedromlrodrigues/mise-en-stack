import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

function IngredientCard({ ingredient, onIngredientClick }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        onClick={onIngredientClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
        }}
      >
        <Typography
          gutterBottom
          component="div"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 0,
          }}
        >
          {ingredient.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default IngredientCard;
