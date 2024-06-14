import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipePage.css';

const dummyRecipes = [
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
];

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = dummyRecipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="recipe-page">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{recipe.title}</h1>
      <div className="recipe-image">[Image Placeholder]</div>
      <div className="recipe-details">
        <div className="recipe-card">
          <h2>Background</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="recipe-card">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-card">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div className="recipe-card">
          <h2>Reviews</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="recipe-card">
          <h2>Comments</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div className="more-recipes">
        <h2>More Recipes</h2>
        <div className="more-recipes-list">
          {dummyRecipes
            .filter((otherRecipe) => otherRecipe.id !== recipe.id)
            .map((otherRecipe) => (
              <div
                key={otherRecipe.id}
                className="more-recipe-card"
                onClick={() => navigate(`/recipe/${otherRecipe.id}`)}
              >
                {otherRecipe.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
