import recipeService from '../services/recipe.service.js';
import { createRecipeSchema } from '../validators/recipe.validator.js';

class RecipeController {
  async getRecipes(req, res) {
    try {
      const page = parseInt(req.query.page ?? '1');
      const limit = parseInt(req.query.limit ?? '10');

      const recipes = await recipeService.getRecipes({ page, limit });

      if (!recipes) {
        return res.status(404).json({ message: 'Recipes not found' });
      }

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.error(error);
    }
  }

  async getRecipeById(req, res) {
    try {
      const recipe = await recipeService.getRecipeById(req.params.id);

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.error(error);
    }
  }

  async createRecipe(req, res) {
    const { error, value } = createRecipeSchema.validate(req.body);

    if (error) {
      console.log('Validation error:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const createdRecipe = await recipeService.createRecipe(value);

      res.status(201).location(`/api/recipes/${createdRecipe.id}`).json(createdRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new RecipeController();
