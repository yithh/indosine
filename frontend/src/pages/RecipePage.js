import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../FirebaseConfig'; // Adjust the path if necessary
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);

  useEffect(() => {
    const recipeRef = ref(database, `recipes/${id}`);
    const recipesRef = ref(database, 'recipes');

    onValue(recipeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRecipe({ id, ...data });
      } else {
        setRecipe(null);
      }
    });

    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recipeList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        if (recipe) {
          setOtherRecipes(getSimilarRecipes(recipeList.filter((recipe) => recipe.id !== id), recipe));
        }
      }
    });
  }, [id, recipe]);

  const getSimilarRecipes = (allRecipes, currentRecipe) => {
    if (!currentRecipe || !currentRecipe.ingredients) {
      return [];
    }

    return allRecipes
      .map(recipe => {
        const ingredientMatchCount = recipe.ingredients?.filter(ingredient =>
          currentRecipe.ingredients.includes(ingredient)
        ).length || 0;
        const regionMatch = recipe.region === currentRecipe.region ? 1 : 0;
        return { ...recipe, score: ingredientMatchCount + regionMatch };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  };

  const handleNavigate = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    navigate(-1);
    window.scrollTo(-100, 0);
  };

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="recipe-page">
      <button onClick={handleBack}>Back</button>
      <div className="recipe-header">
        <div className="recipe-header-content">
          <div className="recipe-image">
            <img src={recipe.image} alt={recipe.title} /> {/* Replace with actual image source */}
          </div>
          <h1>{recipe.title}</h1>
          <p>by: {recipe.author}</p>
        </div>
      </div>
      <div className="recipe-details">
        <div className="recipe-card">
          <h2>Background</h2>
          <p>{recipe.background}</p>
        </div>
        <div className="recipe-card">
          <h2>Ingredients</h2>
          <ul>
            {recipe.amount_ingredients ? (
              recipe.amount_ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
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
        {/* <div className="recipe-card">
          <h2>Reviews</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="recipe-card">
          <h2>Comments</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div> */}
      </div>
      <div className="more-recipes">
        <h2>More Recipes</h2>
        <div className="more-recipes-list">
          {otherRecipes.map((otherRecipe) => (
            <div
              key={otherRecipe.id}
              className="more-recipe-card"
              onClick={() => handleNavigate(otherRecipe.id)}
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
