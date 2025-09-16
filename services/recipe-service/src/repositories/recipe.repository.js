import Recipe from '../models/recipe.model.js';

class RecipeRepository {
  /**
   * Creates a new recipe in the database.
   * @param {object} recipeData - The data for the new recipe.
   * @returns {Promise<Document>} The created recipe document.
   */
  async create(recipeData) {
    return await Recipe.create(recipeData);
  }

  /**
   * Finds all recipes in the database.
   * @returns {Promise<Array<Document>>} An array of all recipe documents.
   */
  async findAll({ page, limit, search }) {
    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { keywords: { $regex: search, $options: 'i' } },
        { ingredientNames: { $regex: search, $options: 'i' } },
      ];
    }

    return await Recipe.find(query)
      .skip(skip)
      .limit(limit)
      .populate('ingredientSections.ingredients.ingredient');
  }

  /**
   * Counts the total number of documents in the collection.
   * @returns {Promise<number>} The total number of recipes.
   */
  async count() {
    return await Recipe.countDocuments();
  }

  /**
   * Finds a single recipe by its unique ID.
   * @param {string} id - The ID of the recipe to find.
   * @returns {Promise<Document|null>} The found recipe document, or null if not found.
   */
  async findById(id) {
    // The .populate() method is crucial here. It tells Mongoose to look up the IDs
    // in the 'ingredients.ingredient' path and replace them with the actual ingredient documents.
    return await Recipe.findById(id).populate('ingredientSections.ingredients.ingredient');
  }

  /**
   * Finds a recipe by its ID and updates it.
   * @param {string} id - The ID of the recipe to update.
   * @param {object} updateData - An object containing the fields to update.
   * @returns {Promise<Document|null>} The updated recipe document.
   */
  async updateById(id, updateData) {
    // The { new: true } option ensures that the method returns the document *after* the update has been applied.
    return await Recipe.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Finds a recipe by its ID and deletes it.
   * @param {string} id - The ID of the recipe to delete.
   * @returns {Promise<Document|null>} The deleted recipe document.
   */
  async deleteById(id) {
    return await Recipe.findByIdAndDelete(id);
  }
}

export default new RecipeRepository();
