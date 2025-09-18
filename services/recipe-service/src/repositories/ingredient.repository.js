import Ingredient from "../models/ingredient.model.js";

class IngredientRepository {
  /**
   * Finds all ingredients in the database.
   * @returns {Promise<Array<Document>>} An array of all ingredient documents.
   */
  async findAll({ page, limit, search }) {
    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    return await Ingredient.find(query).skip(skip).limit(limit);
  }

  /**
   * Finds a single ingredient by its unique ID.
   * @param {string} id - The ID of the ingredient to find.
   * @returns {Promise<Document|null>} The found ingredient document, or null if not found.
   */
  async findById(id) {
    return await Ingredient.findById(id);
  }

  /**
   * Counts the total number of documents in the collection.
   * @returns {Promise<number>} The total number of recipes.
   */
  async count() {
    return await Ingredient.countDocuments();
  }
}

export default new IngredientRepository();
