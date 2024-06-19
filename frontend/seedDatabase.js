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
  },
  {
    id: 5,
    title: 'Nasi Goreng',
    ingredients: ['Rice', 'Garlic', 'Shallots', 'Chili', 'Soy Sauce', 'Eggs', 'Chicken', 'Vegetables', 'Cooking Oil'],
    instructions: [
      'Heat the oil in a pan',
      'Add garlic, shallots, and chili, sauté until fragrant',
      'Add chicken and cook until done',
      'Add rice and mix well',
      'Add soy sauce and stir-fry until well mixed',
      'Make a well in the center, crack the egg and scramble it',
      'Mix the egg with the rice',
      'Add vegetables and stir-fry until everything is combined and heated through',
      'Serve',
    ],
  },
  {
    id: 6,
    title: 'Sate Ayam',
    ingredients: ['Chicken', 'Peanut Sauce', 'Soy Sauce', 'Garlic', 'Shallots', 'Turmeric', 'Salt', 'Pepper', 'Skewers'],
    instructions: [
      'Cut the chicken into small cubes',
      'Marinate the chicken with soy sauce, garlic, shallots, turmeric, salt, and pepper',
      'Thread the chicken onto skewers',
      'Grill the skewers over medium heat until cooked through',
      'Serve with peanut sauce',
    ],
  },
  {
    id: 7,
    title: 'Gado-Gado',
    ingredients: ['Vegetables', 'Tofu', 'Tempeh', 'Boiled Eggs', 'Peanut Sauce'],
    instructions: [
      'Prepare the vegetables (boil or steam as needed)',
      'Fry the tofu and tempeh until golden',
      'Boil the eggs',
      'Arrange the vegetables, tofu, tempeh, and eggs on a plate',
      'Drizzle with peanut sauce',
      'Serve',
    ],
  },
  {
    id: 8,
    title: 'Rendang',
    ingredients: ['Beef', 'Coconut Milk', 'Shallots', 'Garlic', 'Ginger', 'Galangal', 'Chili', 'Lemongrass', 'Turmeric Leaves', 'Kaffir Lime Leaves', 'Salt'],
    instructions: [
      'Blend the shallots, garlic, ginger, galangal, and chili into a paste',
      'Heat oil in a pot and sauté the paste until fragrant',
      'Add the beef and cook until browned',
      'Pour in the coconut milk and add the lemongrass, turmeric leaves, kaffir lime leaves, and salt',
      'Simmer on low heat for several hours until the beef is tender and the sauce is thickened',
      'Serve',
    ],
  },
  {
    id: 9,
    title: 'Ayam Goreng',
    ingredients: ['Chicken', 'Garlic', 'Shallots', 'Coriander', 'Salt', 'Turmeric', 'Cooking Oil'],
    instructions: [
      'Blend garlic, shallots, coriander, salt, and turmeric into a paste',
      'Marinate the chicken with the paste',
      'Heat oil in a pan',
      'Fry the chicken until golden and cooked through',
      'Serve',
    ],
  },
  {
    id: 10,
    title: 'Sop Buntut',
    ingredients: ['Oxtail', 'Carrots', 'Potatoes', 'Tomatoes', 'Shallots', 'Garlic', 'Celery', 'Salt', 'Pepper'],
    instructions: [
      'Boil the oxtail until tender',
      'In a separate pot, sauté shallots and garlic until fragrant',
      'Add the oxtail, carrots, potatoes, and tomatoes to the pot',
      'Add water and bring to a boil',
      'Season with salt and pepper',
      'Simmer until the vegetables are tender',
      'Garnish with celery before serving',
    ],
  },
  {
    id: 11,
    title: 'Bakso',
    ingredients: ['Ground Beef', 'Garlic', 'Salt', 'Pepper', 'Tapioca Flour', 'Beef Broth', 'Noodles', 'Vegetables'],
    instructions: [
      'Mix ground beef with garlic, salt, pepper, and tapioca flour',
      'Form the mixture into balls',
      'Boil the beef broth and cook the meatballs until they float',
      'Prepare the noodles and vegetables',
      'Serve the meatballs in a bowl with broth, noodles, and vegetables',
    ],
  },
  {
    id: 12,
    title: 'Pempek',
    ingredients: ['Fish', 'Tapioca Flour', 'Garlic', 'Salt', 'Sugar', 'Vinegar', 'Palm Sugar', 'Chili', 'Cucumber'],
    instructions: [
      'Blend the fish with garlic, salt, and sugar',
      'Mix in the tapioca flour to form a dough',
      'Shape the dough into small cakes and boil until cooked',
      'Prepare the sauce by boiling palm sugar, vinegar, and chili',
      'Serve the pempek with the sauce and cucumber slices',
    ],
  },
  {
    id: 13,
    title: 'Lontong Sayur',
    ingredients: ['Lontong', 'Vegetables', 'Coconut Milk', 'Shallots', 'Garlic', 'Turmeric', 'Galangal', 'Lemongrass', 'Salt'],
    instructions: [
      'Sauté shallots, garlic, turmeric, and galangal until fragrant',
      'Add coconut milk and lemongrass, bring to a boil',
      'Add the vegetables and cook until tender',
      'Serve with sliced lontong',
    ],
  },
  {
    id: 14,
    title: 'Soto Ayam',
    ingredients: ['Chicken', 'Turmeric', 'Ginger', 'Garlic', 'Shallots', 'Lemongrass', 'Kaffir Lime Leaves', 'Salt', 'Pepper', 'Noodles', 'Vegetables'],
    instructions: [
      'Boil the chicken with turmeric, ginger, garlic, shallots, lemongrass, and kaffir lime leaves until cooked',
      'Remove the chicken and shred it',
      'Strain the broth and return to the pot',
      'Add salt and pepper to taste',
      'Prepare the noodles and vegetables',
      'Serve the broth with shredded chicken, noodles, and vegetables',
    ],
  },
  {
    id: 15,
    title: 'Gudeg',
    ingredients: ['Young Jackfruit', 'Coconut Milk', 'Garlic', 'Shallots', 'Coriander', 'Bay Leaves', 'Palm Sugar', 'Salt'],
    instructions: [
      'Boil the young jackfruit until tender',
      'Blend garlic, shallots, and coriander into a paste',
      'Sauté the paste until fragrant',
      'Add the jackfruit, coconut milk, bay leaves, palm sugar, and salt',
      'Simmer until the jackfruit absorbs the flavors and the sauce thickens',
      'Serve',
    ],
  },
  {
    id: 16,
    title: 'Tahu Goreng',
    ingredients: ['Tofu', 'Garlic', 'Salt', 'Turmeric', 'Cooking Oil'],
    instructions: [
      'Blend garlic, salt, and turmeric into a paste',
      'Marinate the tofu with the paste',
      'Heat oil in a pan',
      'Fry the tofu until golden and crispy',
      'Serve',
    ],
  },
  {
    id: 17,
    title: 'Perkedel Jagung',
    ingredients: ['Corn', 'Eggs', 'Flour', 'Garlic', 'Salt', 'Pepper', 'Cooking Oil'],
    instructions: [
      'Grate the corn',
      'Mix with eggs, flour, garlic, salt, and pepper',
      'Heat oil in a pan',
      'Drop spoonfuls of the mixture into the pan',
      'Fry until golden and crispy',
      'Serve',
    ],
  },
  {
    id: 18,
    title: 'Es Teler',
    ingredients: ['Avocado', 'Jackfruit', 'Coconut Meat', 'Sweetened Condensed Milk', 'Sugar Syrup', 'Ice'],
    instructions: [
      'Slice the avocado, jackfruit, and coconut meat',
      'Place the fruit in a bowl',
      'Add sweetened condensed milk and sugar syrup',
      'Top with ice',
      'Serve',
    ],
  },
  {
    id: 19,
    title: 'Bubur Ayam',
    ingredients: ['Rice', 'Chicken', 'Turmeric', 'Garlic', 'Ginger', 'Salt', 'Pepper', 'Cooking Oil', 'Soy Sauce', 'Fried Shallots', 'Scallions', 'Kecap Manis'],
    instructions: [
      'Boil the rice with turmeric until it becomes a thick porridge',
      'Boil the chicken with garlic, ginger, salt, and pepper until cooked',
      'Shred the chicken and mix with soy sauce',
      'Serve the porridge with shredded chicken, fried shallots, scallions, and kecap manis',
    ],
  },
  {
    id: 20,
    title: 'Sayur Lodeh',
    ingredients: ['Vegetables', 'Coconut Milk', 'Shallots', 'Garlic', 'Chili', 'Galangal', 'Lemongrass', 'Salt'],
    instructions: [
      'Sauté shallots, garlic, and chili until fragrant',
      'Add coconut milk, galangal, and lemongrass, bring to a boil',
      'Add the vegetables and cook until tender',
      'Season with salt',
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
