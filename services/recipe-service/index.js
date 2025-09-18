import express from "express";
import cors from "cors";

import "./src/models/ingredient.model.js";
import "./src/models/recipe.model.js";

import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/auth.routes.js";
import recipeRoutes from "./src/routes/recipe.routes.js";
import ingredientRoutes from "./src/routes/ingredient.routes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
