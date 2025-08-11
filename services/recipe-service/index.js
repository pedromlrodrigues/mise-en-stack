import express from 'express';
import connectDB from './src/config/database.js';
// import recipeRoutes from './src/routes/recipe.routes.js';

// Connect to Database
connectDB();

const app = express();
// ... rest of your server setup
//app.use('/api/recipes', recipeRoutes);
