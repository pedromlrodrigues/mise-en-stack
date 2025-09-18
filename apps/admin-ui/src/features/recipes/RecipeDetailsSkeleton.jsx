import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

function RecipeDetailsSkeleton() {
  return (
    <Box sx={{ p: 3, maxWidth: '90vw', width: '100%', mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        <Skeleton variant="text" />
      </Typography>
      <Skeleton
        variant="rectangular"
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
            <Skeleton variant="text" />
          </Typography>
          <List>
            {Array.from({ length: 4 }).map((_, index) => (
              <Typography key={index} variant="h5" component="h2" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            ))}
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <Skeleton variant="text" />
          </Typography>
          <List>
            {Array.from({ length: 4 }).map((_, index) => (
              <Typography key={index} variant="h5" component="h2" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RecipeDetailsSkeleton;
