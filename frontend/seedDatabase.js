const { database } = require('./src/FirebaseConfig.js');
const { ref, set } = require("firebase/database");

const recipes = [
  {
    id: 1,
    title: 'Telur Dadar Daun Bawang',
    ingredients: ['Eggs', 'Spring Onion', 'Salt', 'Cooking Oil'],
    instructions: [
      'Crack your eggs',
      'Beat them until homogeneous',
      'Add your seasoning and spring onions',
      'Heat pan on medium heat',
      'Add your choice of oil',
      'Add your egg to the pan',
      'Fry until cooked',
      'Serve',
    ],
  },
  {
    id: 2,
    title: 'Cheese Omelette',
    ingredients: ['Eggs', 'Cheese', 'Salt', 'Pepper'],
    instructions: [
      'Crack your eggs',
      'Beat them until homogeneous',
      'Add your seasoning and cheese',
      'Heat pan on medium heat',
      'Add your choice of oil',
      'Add your egg mixture to the pan',
      'Cook until done',
      'Serve',
    ],
  },
  {
    id: 3,
    title: 'Garlic Fried Rice',
    ingredients: ['Rice', 'Garlic', 'Salt', 'Cooking Oil'],
    instructions: [
      'Heat the oil in a pan',
      'Add garlic and sauté until golden',
      'Add rice and salt',
      'Stir-fry until well mixed and heated through',
      'Serve',
    ],
  },
  {
    id: 4,
    title: 'Tomato Salad',
    ingredients: ['Tomatoes', 'Salt', 'Pepper', 'Olive Oil'],
    instructions: [
      'Slice the tomatoes',
      'Season with salt and pepper',
      'Drizzle with olive oil',
      'Toss to combine',
      'Serve',
    ],
  }
];

recipes.forEach((recipe) => {
  const recipeRef = ref(database, 'recipes/' + recipe.id);
  set(recipeRef, recipe)
    .then(() => {
      console.log('Data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving data: ', error);
    });
});
