import express from 'express';
import cors from 'cors';

//  IMPORT MODELS
import './src/models/ingredient.model.js';
import './src/models/recipe.model.js';

import connectDB from './src/config/database.js';
import recipeRoutes from './src/routes/recipe.routes.js';

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
