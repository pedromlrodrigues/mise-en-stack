import ingredientService from "../services/ingredient.service.js";

class IngredientController {
  async getIngredients(req, res) {
    try {
      const { page = "1", limit = "10", search } = req.query;

      const ingredients = await ingredientService.getIngredients({
        page: parseInt(page),
        limit: parseInt(limit),
        search,
      });

      if (!ingredients) {
        return res.status(404).json({ message: "Ingredients not found" });
      }

      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.error(error);
    }
  }

  async getIngredientById(req, res) {
    try {
      const ingredient = await ingredientService.getIngredientById(
        req.params.id
      );

      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }

      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.error(error);
    }
  }
}

export default new IngredientController();
