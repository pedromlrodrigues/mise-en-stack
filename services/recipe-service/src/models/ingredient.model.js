import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String, required: true },
});

export default model('Ingredient', ingredientSchema);
