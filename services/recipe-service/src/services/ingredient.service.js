import ingredientRepository from "../repositories/ingredient.repository.js";

import { toIngredientDTO } from "../mappers/ingredient.mapper.js";

class IngredientService {
  async getIngredients(options) {
    const { page, limit, search } = options;

    const ingredients = await ingredientRepository.findAll({
      page,
      limit,
      search,
    });
    const totalDocuments = await ingredientRepository.count();

    const ingredientDTOs = ingredients.map(toIngredientDTO);

    return {
      data: ingredientDTOs,
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
        limit,
      },
    };
  }

  async getIngredientById(id) {
    const ingredientEntity = await ingredientRepository.findById(id);

    if (!ingredientEntity) {
      return null;
    }

    return toIngredientDTO(ingredientEntity);
  }
}

export default new IngredientService();
