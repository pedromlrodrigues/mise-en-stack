import recipeService from '../services/recipe.service.js';

class RecipeController {
  async getRecipes(req, res) {
    try {
      const page = parseInt(req.query.page ?? '1');
      const limit = parseInt(req.query.limit ?? '10');

      const recipes = await recipeService.getRecipes({ page, limit });

      if (!recipes) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
      console.error(error);
    }
  }
}

export default new RecipeController();
