/**
 * Maps a Mongoose recipe document to a public-facing Recipe DTO.
 * This function assumes the recipe's ingredients have been populated.
 * @param {Document} recipeDocument - The Mongoose document for a recipe.
 * @returns {object|null} The recipe DTO or null.
 */
function toRecipeDTO(recipeDocument) {
  if (!recipeDocument) {
    return null;
  }

  const ingredients = recipeDocument.ingredients?.map((item) => ({
    name: item.ingredient.name,
    quantity: item.quantity,
    unit: item.unit,
  }));

  return {
    id: recipeDocument._id,
    name: recipeDocument.name,
    description: recipeDocument.description,
    keywords: recipeDocument.keywords,
    preparationSections: recipeDocument.preparationSections,
    ingredients: ingredients,
    createdAt: recipeDocument.createdAt,
  };
}

export { toRecipeDTO };
