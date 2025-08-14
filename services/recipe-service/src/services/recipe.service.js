import recipeRepository from '../repositories/recipe.repository.js';
import { toRecipeDTO } from '../mappers/recipe.mapper.js';

class RecipeService {
  async getRecipes(options) {
    const { page, limit } = options;

    const recipes = await recipeRepository.findAll({ page, limit });
    const totalDocuments = await recipeRepository.count();

    const recipeDTOs = recipes.map(toRecipeDTO);

    return {
      data: recipeDTOs,
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
        limit,
      },
    };
  }
}

export default new RecipeService();
