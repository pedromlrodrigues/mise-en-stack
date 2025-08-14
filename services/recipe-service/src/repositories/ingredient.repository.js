import Ingredient from '../models/ingredient.model.js';

class IngredientRepository {
  /**
   * Finds multiple ingredient documents by an array of their unique IDs.
   * @param {string[]} ids - An array of ingredient ID strings to search for.
   * @returns {Promise<Document[]>} A promise that resolves to an array of the found ingredient documents.
   */
  async findManyByIds(ids) {
    return await Ingredient.find({ _id: { $in: ids } });
  }
}

export default new IngredientRepository();
