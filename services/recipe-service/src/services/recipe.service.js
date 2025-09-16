import recipeRepository from '../repositories/recipe.repository.js';
import ingredientRepository from '../repositories/ingredient.repository.js';

import { toRecipeDTO } from '../mappers/recipe.mapper.js';

class RecipeService {
  async getRecipes(options) {
    const { page, limit, search } = options;

    const recipes = await recipeRepository.findAll({ page, limit, search });
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
    const recipeEntity = await recipeRepository.findById(id);

    if (!recipeEntity) {
      return null;
    }

    return toRecipeDTO(recipeEntity);
  }

  async createRecipe(recipeData) {
    const ingredientIds = recipeData.ingredientSections.flatMap((item) =>
      item.ingredients.map((ingredient) => ingredient.ingredient)
    );
    const uniqueIngredientIds = [...new Set(ingredientIds)];
    const ingredients = await ingredientRepository.findManyByIds(uniqueIngredientIds);
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);

    const dataToSave = {
      ...recipeData,
      ingredientNames: ingredientNames,
    };

    const newRecipe = await recipeRepository.create(dataToSave);

    await newRecipe.populate('ingredientSections.ingredients.ingredient');

    return toRecipeDTO(newRecipe);
  }
}

export default new RecipeService();
