import Joi from 'joi';

const ingredientSchema = Joi.object({
  ingredient: Joi.string().hex().length(24).required(),
  quantity: Joi.number().min(0).required(),
  unit: Joi.string().required(),
});

const createRecipeSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  instructions: Joi.string().min(20).required(),
  ingredients: Joi.array().items(ingredientSchema).min(1).required(),
});

export { createRecipeSchema };
