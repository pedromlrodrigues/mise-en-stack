import mongoose from 'mongoose';
import 'dotenv/config';
import Recipe from './src/models/recipe.model.js';
import Ingredient from './src/models/ingredient.model.js';

const seedDB = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // 2. Clear existing data
    await Ingredient.deleteMany({});
    await Recipe.deleteMany({});
    console.log('Existing data cleared.');

    // 3. Seed the ingredients
    const ingredientsToSeed = [
      { name: 'Ovo' },
      { name: 'Farinha' },
      { name: 'Açúcar' },
      { name: 'Manteiga' },
    ];
    await Ingredient.insertMany(ingredientsToSeed);
    console.log('Ingredients seeded.');

    // 4. Find the ingredients we just created to get their IDs
    const ovo = await Ingredient.findOne({ name: 'Ovo' });
    const farinha = await Ingredient.findOne({ name: 'Farinha' });
    const acucar = await Ingredient.findOne({ name: 'Açúcar' });

    // 5. Build the recipe data using the ingredient IDs
    const recipesToSeed = [
      {
        name: 'Bolo Simples',
        description: 'Um bolo fofo e delicioso para o café da tarde.',
        instructions:
          '1. Bata os ovos com o açúcar. 2. Adicione a farinha e misture. 3. Leve ao forno.',
        ingredients: [
          { ingredient: ovo._id, quantity: 3, unit: 'unidades' },
          { ingredient: farinha._id, quantity: 2, unit: 'chávenas' },
          { ingredient: acucar._id, quantity: 1.5, unit: 'chávenas' },
        ],
        keywords: ['breakfast'],
        ingredientNames: [ovo.name, farinha.name, acucar.name],
      },
    ];

    // 6. Seed the recipes
    await Recipe.insertMany(recipesToSeed);
    console.log('Recipes seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // 7. Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDB();
