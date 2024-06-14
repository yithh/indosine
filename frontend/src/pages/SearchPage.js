import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
];

const dummyRecipes = [
  {
    id: 1,
    title: 'Telur Dadar Daun Bawang',
    ingredients: ['Eggs', 'Spring Onion', 'Salt', 'Cooking Oil'],
  },
  {
    id: 2,
    title: 'Cheese Omelette',
    ingredients: ['Eggs', 'Cheese', 'Salt', 'Pepper'],
  },
  {
    id: 3,
    title: 'Garlic Fried Rice',
    ingredients: ['Rice', 'Garlic', 'Salt', 'Cooking Oil'],
  },
  {
    id: 4,
    title: 'Tomato Salad',
    ingredients: ['Tomatoes', 'Salt', 'Pepper', 'Olive Oil'],
  },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);

  const navigate = useNavigate();

  useEffect(() => {
    filterRecipes(searchTerm, selectedIngredients);
  }, [searchTerm, selectedIngredients]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleIngredientChange = (ingredient) => {
    const index = selectedIngredients.indexOf(ingredient);
    if (index === -1) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    }
  };

  const filterRecipes = (term, ingredients) => {
    let filtered = dummyRecipes;

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
  };

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
        <div>
          <p>Select Ingredients:</p>
          {dummyIngredients.map((ingredient) => (
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
