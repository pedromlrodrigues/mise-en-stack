/**
 * Maps a Mongoose ingredient document to a public-facing Ingredient DTO.
 * @param {Document} ingredientDocument - The Mongoose document for a ingredient.
 * @returns {object|null} The ingredient DTO or null.
 */
function toIngredientDTO(ingredientDocument) {
  if (!ingredientDocument) {
    return null;
  }

  return {
    id: ingredientDocument._id,
    name: ingredientDocument.name,
  };
}

export { toIngredientDTO };
