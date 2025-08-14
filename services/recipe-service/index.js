import express from 'express';

//  IMPORT MODELS
import './src/models/ingredient.model.js';
import './src/models/recipe.model.js';

import connectDB from './src/config/database.js';
import recipeRoutes from './src/routes/recipe.routes.js';

// Connect to Database
connectDB();

const app = express();

app.use('/api/recipes', recipeRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
