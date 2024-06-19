import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../FirebaseConfig'; // Adjust the path if necessary
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

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
      if (data) {
        const recipeList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setRecipes(recipeList);
        setFilteredRecipes(recipeList);
        const allIngredients = recipeList.flatMap(recipe => recipe.ingredients);
        const uniqueIngredients = [...new Set(allIngredients)];
        setIngredients(uniqueIngredients);
      }
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

  const handleDeselectIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.toLowerCase().includes(ingredientSearchTerm) &&
    !selectedIngredients.includes(ingredient)
  );

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="search-page">
      <div className="search-column">
        <input
          type="text"
          placeholder="Cari bahan"
          value={ingredientSearchTerm}
          onChange={handleIngredientSearch}
        />
        <div className="selected-ingredients-container">
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="selected-ingredient"
              onClick={() => handleDeselectIngredient(ingredient)}
            >
              {ingredient}
            </div>
          ))}
        </div>
        <div>
          <p>Ingredients</p>
          {filteredIngredients.map((ingredient, index) => (
            <div key={index}>
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
        <input
          type="text"
          placeholder="Cari resep"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleCardClick(recipe.id)}
              >
                <div className="recipe-card-image">
                  <img src="path/to/image" alt={recipe.title} /> {/* Replace with actual image source */}
                </div>
                <div className="recipe-card-content">
                  <h3>{recipe.title}</h3>
                  <p>Anda kurang {recipe.ingredients.length - selectedIngredients.length} bahan</p>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
