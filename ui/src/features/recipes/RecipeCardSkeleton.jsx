import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function RecipeCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
}

export default RecipeCardSkeleton;
