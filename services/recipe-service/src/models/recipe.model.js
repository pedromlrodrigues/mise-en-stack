import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: { type: String, required: true },
  instructions: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient', // Tells Mongoose this is a reference
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
});

export default model('Recipe', recipeSchema);
