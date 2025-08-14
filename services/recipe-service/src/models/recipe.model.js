import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    keywords: [{ type: String, required: true }],
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    ingredientNames: [String],
  },
  { timestamps: true }
);

recipeSchema.index({ name: 1 });
recipeSchema.index({ keywords: 1 });
recipeSchema.index({ ingredientNames: 1 });

export default model('Recipe', recipeSchema);
