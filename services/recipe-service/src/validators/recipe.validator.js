import Joi from 'joi';

const ingredientSchema = Joi.object({
  ingredient: Joi.string().hex().length(24).required(),
  quantity: Joi.number().min(0).required(),
  unit: Joi.string().required(),
});

const createRecipeSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  preparationSections: Joi.array().min(1).required(),
  ingredientSections: Joi.array().items().min(1).required(),
});

export { createRecipeSchema };
