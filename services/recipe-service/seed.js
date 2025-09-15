import mongoose from 'mongoose';
import 'dotenv/config';
import Recipe from './src/models/recipe.model.js';
import Ingredient from './src/models/ingredient.model.js';

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Ingredient.deleteMany({});
    await Recipe.deleteMany({});
    console.log('Existing data cleared.');

    const ingredientsToSeed = [
      { name: 'Ovo' },
      { name: 'Farinha' },
      { name: 'Açúcar' },
      { name: 'Manteiga' },
    ];
    await Ingredient.insertMany(ingredientsToSeed);
    console.log('Ingredients seeded.');

    const ovo = await Ingredient.findOne({ name: 'Ovo' });
    const farinha = await Ingredient.findOne({ name: 'Farinha' });
    const acucar = await Ingredient.findOne({ name: 'Açúcar' });

    const recipesToSeed = [
      {
        name: 'Bolo Simples',
        description: 'Um bolo fofo e delicioso para o café da tarde.',
        preparationSections: [
          {
            steps: [
              'Bata os ovos com o açúcar.',
              'Adicione a farinha e misture.',
              'Leve ao forno.',
            ],
          },
        ],
        ingredients: [
          { ingredient: ovo._id, quantity: 3, unit: 'unidades' },
          { ingredient: farinha._id, quantity: 2, unit: 'chávenas' },
          { ingredient: acucar._id, quantity: 1.5, unit: 'chávenas' },
        ],
        keywords: ['breakfast'],
        ingredientNames: [ovo.name, farinha.name, acucar.name],
      },
      {
        name: 'Carne assada',
        description: 'Uma carne assada de comer e chorar por mais.',
        preparationSections: [
          {
            title: 'Preparar a carne',
            steps: ['Tempere com alegria.', 'Aqueça uma frigideira e sele a carne.'],
          },
          {
            title: 'Preparar o arroz',
            steps: ['Tempere com alegria.', 'Aqueça uma frigideira e sele a carne.'],
          },
        ],
        ingredients: [
          { ingredient: ovo._id, quantity: 3, unit: 'unidades' },
          { ingredient: farinha._id, quantity: 2, unit: 'chávenas' },
          { ingredient: acucar._id, quantity: 1.5, unit: 'chávenas' },
        ],
        keywords: ['breakfast'],
        ingredientNames: [ovo.name, farinha.name, acucar.name],
      },
    ];

    await Recipe.insertMany(recipesToSeed);
    console.log('Recipes seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDB();
