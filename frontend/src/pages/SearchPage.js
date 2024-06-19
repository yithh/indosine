import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../FirebaseConfig'; // Adjust the path if necessary
import './SearchPage.css';

const dummyIngredients = [
  'Eggs',
  'Spring Onion',
  'Salt',
  'Cooking Oil',
  'Garlic',
  'Pepper',
  'Tomatoes',
  'Cheese',
  'Rice',
  'Ketchup',
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

  const filterRecipes = useCallback((term, ingredients) => {
    let filtered = recipes;

    if (term) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(term)
      );
    }

    if (ingredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        ingredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient)
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes]);

  useEffect(() => {
    const recipesRef = ref(database, 'recipes');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const recipeList = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setRecipes(recipeList);
      setFilteredRecipes(recipeList);
    });
  }, []);

  useEffect(() => {
    filterRecipes(searchTerm, selectedIngredients);
  }, [searchTerm, selectedIngredients, filterRecipes]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleIngredientSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setIngredientSearchTerm(term);
  };

  const handleIngredientChange = (ingredient) => {
    const index = selectedIngredients.indexOf(ingredient);
    if (index === -1) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    }
  };

  const filteredDummyIngredients = dummyIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(ingredientSearchTerm)
  );

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="search-page">
      <div className="search-column">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={ingredientSearchTerm}
          onChange={handleIngredientSearch}
        />
        <div>
          <p>Select Ingredients:</p>
          {filteredDummyIngredients.map((ingredient) => (
            <div key={ingredient}>
              <label className="labelapapun">
                <input
                  type="checkbox"
                  className="cekbok"
                  value={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                <div className="ing">
                  {ingredient}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="results-column">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => handleCardClick(recipe.id)}
            >
              {recipe.title}
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
