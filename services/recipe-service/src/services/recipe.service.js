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

  async getRecipeById(id) {
    console.log(id);
    const recipeEntity = await recipeRepository.findById(id);

    if (!recipeEntity) {
      return null;
    }

    return toRecipeDTO(recipeEntity);
  }
}

export default new RecipeService();
