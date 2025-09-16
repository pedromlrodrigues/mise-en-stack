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

  return {
    id: recipeDocument._id,
    name: recipeDocument.name,
    description: recipeDocument.description,
    keywords: recipeDocument.keywords,
    preparationSections: recipeDocument.preparationSections.map((section) => ({
      title: section.title,
      steps: section.steps,
    })),
    ingredientSections: recipeDocument.ingredientSections.map((section) => ({
      title: section.title,
      ingredients: section.ingredients.map((item) => ({
        name: item.ingredient.name,
        unit: item.unit,
        quantity: item.quantity,
      })),
    })),
  };
}

export { toRecipeDTO };
