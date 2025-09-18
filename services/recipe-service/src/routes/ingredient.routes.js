import express from "express";
import ingredientController from "../controllers/ingredient.controller.js";

const router = express.Router();

// router.post('/', ingredientController.createRecipe);
router.get("/", ingredientController.getIngredients);
router.get("/:id", ingredientController.getIngredientById);

export default router;
