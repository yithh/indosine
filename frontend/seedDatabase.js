const { database } = require('./src/FirebaseConfig.js');
const { ref, set } = require("firebase/database");

const recipes = [
  {
    id: 1,
    title: 'Telur Dadar Daun Bawang',
    amount_ingredients: [
      '2 Eggs',
      '2 stalks Spring Onion',
      '1/2 tsp Salt',
      '2 tbsp Cooking Oil'
    ],
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
    image: 'https://example.com/image1.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'This is a traditional Indonesian omelette made with eggs and spring onions. It is quick and easy to make, perfect for breakfast or a light meal.'
  },
  {
    id: 2,
    title: 'Sate Kambing',
    amount_ingredients: [
      '500g Goat Meat',
      '3 tbsp Soy Sauce',
      '3 cloves Garlic',
      '5 Shallots',
      '1 Lime',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      'Skewers'
    ],
    ingredients: ['Goat Meat', 'Soy Sauce', 'Garlic', 'Shallots', 'Lime', 'Salt', 'Pepper', 'Skewers'],
    instructions: [
      'Cut the goat meat into small cubes',
      'Marinate the meat with soy sauce, garlic, shallots, lime, salt, and pepper',
      'Thread the meat onto skewers',
      'Grill the skewers over medium heat until cooked through',
      'Serve with peanut sauce',
    ],
    image: 'https://example.com/image2.jpg',
    region: 'Solo',
    author: 'Anonymous',
    background: 'Sate Kambing is a popular Indonesian dish consisting of skewered and grilled goat meat. It is typically served with a rich peanut sauce.'
  },
  {
    id: 3,
    title: 'Nasi Uduk',
    amount_ingredients: [
      '2 cups Rice',
      '1 can Coconut Milk',
      '2 stalks Lemongrass',
      '3 Bay Leaves',
      '1 tsp Salt'
    ],
    ingredients: ['Rice', 'Coconut Milk', 'Lemongrass', 'Bay Leaves', 'Salt'],
    instructions: [
      'Rinse the rice until the water runs clear',
      'In a pot, combine rice, coconut milk, lemongrass, bay leaves, and salt',
      'Cook over medium heat until the rice is done',
      'Fluff the rice with a fork before serving',
      'Serve with fried shallots and side dishes',
    ],
    image: 'https://example.com/image3.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'Nasi Uduk is a fragrant coconut rice dish commonly enjoyed as a staple in Indonesian cuisine. It is often served with a variety of side dishes.'
  },
  {
    id: 4,
    title: 'Pecel Lele',
    amount_ingredients: [
      '4 Catfish',
      '1 tsp Turmeric',
      '3 cloves Garlic',
      '1 tsp Salt',
      '2 cups Cooking Oil',
      'Sambal',
      '1 Lime'
    ],
    ingredients: ['Catfish', 'Turmeric', 'Garlic', 'Salt', 'Cooking Oil', 'Sambal', 'Lime'],
    instructions: [
      'Clean the catfish and marinate with turmeric, garlic, and salt',
      'Heat oil in a pan',
      'Fry the catfish until golden and crispy',
      'Serve with sambal and lime',
    ],
    image: 'https://example.com/image4.jpg',
    region: 'Surabaya',
    author: 'Anonymous',
    background: 'Pecel Lele is a deep-fried catfish dish commonly found in Indonesian street food. It is typically served with spicy sambal and lime.'
  },
  {
    id: 5,
    title: 'Nasi Goreng',
    amount_ingredients: [
      '2 cups Rice',
      '3 cloves Garlic',
      '5 Shallots',
      '2 Chili',
      '3 tbsp Soy Sauce',
      '2 Eggs',
      '100g Chicken',
      '1 cup Vegetables',
      '2 tbsp Cooking Oil'
    ],
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
    image: 'https://example.com/image5.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'Nasi Goreng, or fried rice, is a beloved Indonesian dish made with stir-fried rice, vegetables, and meat. It is often garnished with fried shallots and a fried egg.'
  },
  {
    id: 6,
    title: 'Sate Ayam',
    amount_ingredients: [
      '500g Chicken',
      '3 tbsp Peanut Sauce',
      '3 tbsp Soy Sauce',
      '3 cloves Garlic',
      '5 Shallots',
      '1 tsp Turmeric',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      'Skewers'
    ],
    ingredients: ['Chicken', 'Peanut Sauce', 'Soy Sauce', 'Garlic', 'Shallots', 'Turmeric', 'Salt', 'Pepper', 'Skewers'],
    instructions: [
      'Cut the chicken into small cubes',
      'Marinate the chicken with soy sauce, garlic, shallots, turmeric, salt, and pepper',
      'Thread the chicken onto skewers',
      'Grill the skewers over medium heat until cooked through',
      'Serve with peanut sauce',
    ],
    image: 'https://example.com/image6.jpg',
    region: 'Yogyakarta',
    author: 'Anonymous',
    background: 'Sate Ayam is a popular Indonesian chicken skewer dish served with a rich and creamy peanut sauce. It is often enjoyed as a street food snack.'
  },
  {
    id: 7,
    title: 'Gado-Gado',
    amount_ingredients: [
      '1 cup Vegetables',
      '1 block Tofu',
      '1 block Tempeh',
      '2 Boiled Eggs',
      '3 tbsp Peanut Sauce'
    ],
    ingredients: ['Vegetables', 'Tofu', 'Tempeh', 'Boiled Eggs', 'Peanut Sauce'],
    instructions: [
      'Prepare the vegetables (boil or steam as needed)',
      'Fry the tofu and tempeh until golden',
      'Boil the eggs',
      'Arrange the vegetables, tofu, tempeh, and eggs on a plate',
      'Drizzle with peanut sauce',
      'Serve',
    ],
    image: 'https://example.com/image7.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'Gado-Gado is a traditional Indonesian salad made with boiled vegetables, tofu, tempeh, and eggs, served with a delicious peanut sauce.'
  },
  {
    id: 8,
    title: 'Rendang',
    amount_ingredients: [
      '1 kg Beef',
      '2 cans Coconut Milk',
      '10 Shallots',
      '5 cloves Garlic',
      '2 inches Ginger',
      '2 inches Galangal',
      '10 Red Chilies',
      '2 stalks Lemongrass',
      '5 Turmeric Leaves',
      '3 Kaffir Lime Leaves',
      '2 tsp Salt'
    ],
    ingredients: ['Beef', 'Coconut Milk', 'Shallots', 'Garlic', 'Ginger', 'Galangal', 'Red Chilies', 'Lemongrass', 'Turmeric Leaves', 'Kaffir Lime Leaves', 'Salt'],
    instructions: [
      'Blend the shallots, garlic, ginger, galangal, and chili into a paste',
      'Heat oil in a pot and sauté the paste until fragrant',
      'Add the beef and cook until browned',
      'Pour in the coconut milk and add the lemongrass, turmeric leaves, kaffir lime leaves, and salt',
      'Simmer on low heat for several hours until the beef is tender and the sauce is thickened',
      'Serve',
    ],
    image: 'https://example.com/image8.jpg',
    region: 'Padang',
    author: 'Anonymous',
    background: 'Rendang is a rich and tender coconut beef stew which is explosively flavorful. It is a signature dish in Indonesian cuisine, especially in Padang.'
  },
  {
    id: 9,
    title: 'Ayam Goreng',
    amount_ingredients: [
      '1 kg Chicken',
      '3 cloves Garlic',
      '5 Shallots',
      '1 tsp Coriander',
      '1 tsp Salt',
      '1 tsp Turmeric',
      '2 cups Cooking Oil'
    ],
    ingredients: ['Chicken', 'Garlic', 'Shallots', 'Coriander', 'Salt', 'Turmeric', 'Cooking Oil'],
    instructions: [
      'Blend garlic, shallots, coriander, salt, and turmeric into a paste',
      'Marinate the chicken with the paste',
      'Heat oil in a pan',
      'Fry the chicken until golden and cooked through',
      'Serve',
    ],
    image: 'https://example.com/image9.jpg',
    region: 'Bandung',
    author: 'Anonymous',
    background: 'Ayam Goreng is a flavorful Indonesian fried chicken marinated with traditional spices and herbs. It is a beloved dish across Indonesia.'
  },
  {
    id: 10,
    title: 'Sop Buntut',
    amount_ingredients: [
      '1 kg Oxtail',
      '3 Carrots',
      '2 Potatoes',
      '3 Tomatoes',
      '5 Shallots',
      '3 cloves Garlic',
      '1 stalk Celery',
      '1 tsp Salt',
      '1/2 tsp Pepper'
    ],
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
    image: 'https://example.com/image10.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'Sop Buntut is a delicious Indonesian oxtail soup simmered with vegetables and fragrant spices. It is a comforting and hearty meal.'
  },
  {
    id: 11,
    title: 'Bakso',
    amount_ingredients: [
      '500g Ground Beef',
      '3 cloves Garlic',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      '3 tbsp Tapioca Flour',
      '1 liter Beef Broth',
      '200g Noodles',
      '1 cup Vegetables'
    ],
    ingredients: ['Ground Beef', 'Garlic', 'Salt', 'Pepper', 'Tapioca Flour', 'Beef Broth', 'Noodles', 'Vegetables'],
    instructions: [
      'Mix ground beef with garlic, salt, pepper, and tapioca flour',
      'Form the mixture into balls',
      'Boil the beef broth and cook the meatballs until they float',
      'Prepare the noodles and vegetables',
      'Serve the meatballs in a bowl with broth, noodles, and vegetables',
    ],
    image: 'https://example.com/image11.jpg',
    region: 'Malang',
    author: 'Anonymous',
    background: 'Bakso is a popular Indonesian meatball soup made with ground beef and tapioca flour, served in a flavorful beef broth with noodles and vegetables.'
  },
  {
    id: 12,
    title: 'Pempek',
    amount_ingredients: [
      '500g Fish',
      '200g Tapioca Flour',
      '3 cloves Garlic',
      '1 tsp Salt',
      '1 tbsp Sugar',
      '100ml Vinegar',
      '200g Palm Sugar',
      '5 Red Chilies',
      '1 Cucumber'
    ],
    ingredients: ['Fish', 'Tapioca Flour', 'Garlic', 'Salt', 'Sugar', 'Vinegar', 'Palm Sugar', 'Red Chilies', 'Cucumber'],
    instructions: [
      'Blend the fish with garlic, salt, and sugar',
      'Mix in the tapioca flour to form a dough',
      'Shape the dough into small cakes and boil until cooked',
      'Prepare the sauce by boiling palm sugar, vinegar, and chili',
      'Serve the pempek with the sauce and cucumber slices',
    ],
    image: 'https://example.com/image12.jpg',
    region: 'Palembang',
    author: 'Anonymous',
    background: 'Pempek is a traditional Indonesian fish cake delicacy from Palembang, served with a tangy and spicy vinegar sauce.'
  },
  {
    id: 13,
    title: 'Lontong Sayur',
    amount_ingredients: [
      '4 Lontong',
      '1 cup Vegetables',
      '1 can Coconut Milk',
      '5 Shallots',
      '3 cloves Garlic',
      '1 tsp Turmeric',
      '2 inches Galangal',
      '2 stalks Lemongrass',
      '1 tsp Salt'
    ],
    ingredients: ['Lontong', 'Vegetables', 'Coconut Milk', 'Shallots', 'Garlic', 'Turmeric', 'Galangal', 'Lemongrass', 'Salt'],
    instructions: [
      'Sauté shallots, garlic, turmeric, and galangal until fragrant',
      'Add coconut milk and lemongrass, bring to a boil',
      'Add the vegetables and cook until tender',
      'Serve with sliced lontong',
    ],
    image: 'https://example.com/image13.jpg',
    region: 'Bogor',
    author: 'Anonymous',
    background: 'Lontong Sayur is a savory Indonesian dish consisting of rice cakes (lontong) served with a rich coconut milk vegetable stew.'
  },
  {
    id: 14,
    title: 'Soto Ayam',
    amount_ingredients: [
      '1 kg Chicken',
      '1 tsp Turmeric',
      '2 inches Ginger',
      '3 cloves Garlic',
      '5 Shallots',
      '2 stalks Lemongrass',
      '3 Kaffir Lime Leaves',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      '200g Noodles',
      '1 cup Vegetables'
    ],
    ingredients: ['Chicken', 'Turmeric', 'Ginger', 'Garlic', 'Shallots', 'Lemongrass', 'Kaffir Lime Leaves', 'Salt', 'Pepper', 'Noodles', 'Vegetables'],
    instructions: [
      'Boil the chicken with turmeric, ginger, garlic, shallots, lemongrass, and kaffir lime leaves until cooked',
      'Remove the chicken and shred it',
      'Strain the broth and return to the pot',
      'Add salt and pepper to taste',
      'Prepare the noodles and vegetables',
      'Serve the broth with shredded chicken, noodles, and vegetables',
    ],
    image: 'https://example.com/image14.jpg',
    region: 'Surabaya',
    author: 'Anonymous',
    background: 'Soto Ayam is a traditional Indonesian chicken soup flavored with turmeric and lemongrass, typically served with noodles and vegetables.'
  },
  {
    id: 15,
    title: 'Gudeg',
    amount_ingredients: [
      '1 kg Young Jackfruit',
      '2 cans Coconut Milk',
      '3 cloves Garlic',
      '5 Shallots',
      '1 tsp Coriander',
      '3 Bay Leaves',
      '200g Palm Sugar',
      '1 tsp Salt'
    ],
    ingredients: ['Young Jackfruit', 'Coconut Milk', 'Garlic', 'Shallots', 'Coriander', 'Bay Leaves', 'Palm Sugar', 'Salt'],
    instructions: [
      'Boil the young jackfruit until tender',
      'Blend garlic, shallots, and coriander into a paste',
      'Sauté the paste until fragrant',
      'Add the jackfruit, coconut milk, bay leaves, palm sugar, and salt',
      'Simmer until the jackfruit absorbs the flavors and the sauce thickens',
      'Serve',
    ],
    image: 'https://example.com/image15.jpg',
    region: 'Yogyakarta',
    author: 'Anonymous',
    background: 'Gudeg is a traditional Indonesian dish made from young unripe jackfruit, slowly stewed with palm sugar and coconut milk.'
  },
  {
    id: 16,
    title: 'Tahu Goreng',
    amount_ingredients: [
      '500g Tofu',
      '3 cloves Garlic',
      '1 tsp Salt',
      '1 tsp Turmeric',
      '2 cups Cooking Oil'
    ],
    ingredients: ['Tofu', 'Garlic', 'Salt', 'Turmeric', 'Cooking Oil'],
    instructions: [
      'Blend garlic, salt, and turmeric into a paste',
      'Marinate the tofu with the paste',
      'Heat oil in a pan',
      'Fry the tofu until golden and crispy',
      'Serve',
    ],
    image: 'https://example.com/image16.jpg',
    region: 'Java',
    author: 'Anonymous',
    background: 'Tahu Goreng is a simple yet delicious Indonesian fried tofu dish, marinated with spices and deep-fried until crispy.'
  },
  {
    id: 17,
    title: 'Perkedel Jagung',
    amount_ingredients: [
      '2 ears Corn',
      '2 Eggs',
      '1/2 cup Flour',
      '3 cloves Garlic',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      '2 cups Cooking Oil'
    ],
    ingredients: ['Corn', 'Eggs', 'Flour', 'Garlic', 'Salt', 'Pepper', 'Cooking Oil'],
    instructions: [
      'Grate the corn',
      'Mix with eggs, flour, garlic, salt, and pepper',
      'Heat oil in a pan',
      'Drop spoonfuls of the mixture into the pan',
      'Fry until golden and crispy',
      'Serve',
    ],
    image: 'https://example.com/image17.jpg',
    region: 'East Java',
    author: 'Anonymous',
    background: 'Perkedel Jagung is an Indonesian corn fritter made from grated corn, eggs, and spices, deep-fried until golden and crispy.'
  },
  {
    id: 18,
    title: 'Es Teler',
    amount_ingredients: [
      '1 Avocado',
      '100g Jackfruit',
      '100g Coconut Meat',
      '2 tbsp Sweetened Condensed Milk',
      '2 tbsp Sugar Syrup',
      '1 cup Ice'
    ],
    ingredients: ['Avocado', 'Jackfruit', 'Coconut Meat', 'Sweetened Condensed Milk', 'Sugar Syrup', 'Ice'],
    instructions: [
      'Slice the avocado, jackfruit, and coconut meat',
      'Place the fruit in a bowl',
      'Add sweetened condensed milk and sugar syrup',
      'Top with ice',
      'Serve',
    ],
    image: 'https://example.com/image18.jpg',
    region: 'Central Java',
    author: 'Anonymous',
    background: 'Es Teler is a popular Indonesian fruit cocktail made with avocado, jackfruit, coconut meat, and sweetened condensed milk, served with ice.'
  },
  {
    id: 19,
    title: 'Bubur Ayam',
    amount_ingredients: [
      '2 cups Rice',
      '500g Chicken',
      '1 tsp Turmeric',
      '3 cloves Garlic',
      '2 inches Ginger',
      '1 tsp Salt',
      '1/2 tsp Pepper',
      '2 tbsp Cooking Oil',
      '3 tbsp Soy Sauce',
      '3 tbsp Fried Shallots',
      '3 stalks Scallions',
      '3 tbsp Kecap Manis'
    ],
    ingredients: ['Rice', 'Chicken', 'Turmeric', 'Garlic', 'Ginger', 'Salt', 'Pepper', 'Cooking Oil', 'Soy Sauce', 'Fried Shallots', 'Scallions', 'Kecap Manis'],
    instructions: [
      'Boil the rice with turmeric until it becomes a thick porridge',
      'Boil the chicken with garlic, ginger, salt, and pepper until cooked',
      'Shred the chicken and mix with soy sauce',
      'Serve the porridge with shredded chicken, fried shallots, scallions, and kecap manis',
    ],
    image: 'https://example.com/image19.jpg',
    region: 'Jakarta',
    author: 'Anonymous',
    background: 'Bubur Ayam is an Indonesian chicken congee, a savory rice porridge topped with shredded chicken, fried shallots, and scallions.'
  },
  {
    id: 20,
    title: 'Sayur Lodeh',
    amount_ingredients: [
      '1 cup Vegetables',
      '1 can Coconut Milk',
      '5 Shallots',
      '3 cloves Garlic',
      '2 Red Chilies',
      '2 inches Galangal',
      '2 stalks Lemongrass',
      '1 tsp Salt'
    ],
    ingredients: ['Vegetables', 'Coconut Milk', 'Shallots', 'Garlic', 'Red Chilies', 'Galangal', 'Lemongrass', 'Salt'],
    instructions: [
      'Sauté shallots, garlic, and chili until fragrant',
      'Add coconut milk, galangal, and lemongrass, bring to a boil',
      'Add the vegetables and cook until tender',
      'Season with salt',
      'Serve',
    ],
    image: 'https://example.com/image20.jpg',
    region: 'Central Java',
    author: 'Anonymous',
    background: 'Sayur Lodeh is a traditional Indonesian vegetable stew made with coconut milk, often served with rice or lontong.'
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
