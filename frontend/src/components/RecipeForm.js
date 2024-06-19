import React, { useState } from 'react';
import './RecipeForm.css';
import axios from 'axios';
import UploadImage from './UploadImage';

const dummyUnits = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp'];
const dummyIngredients = ['Flour', 'Sugar', 'Butter', 'Eggs', 'Milk', 'Salt'];

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    description: '',
    name: '',
    servings: '',
    anonymous: false,
    ingredients: [{ amount: '', unit: '', name: '' }],
    instructions: [''],
    imageUrl: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = recipe.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [e.target.name]: e.target.value } : ingredient
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, e) => {
    const newInstructions = recipe.instructions.map((instruction, i) =>
      i === index ? e.target.value : instruction
    );
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { amount: '', unit: '', name: '' }] });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const deleteIngredient = (index) => {
    if (recipe.ingredients.length > 1) {
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };

  const deleteInstruction = (index) => {
    if (recipe.instructions.length > 1) {
      const newInstructions = recipe.instructions.filter((_, i) => i !== index);
      setRecipe({ ...recipe, instructions: newInstructions });
    }
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: 'c69ab2f123791781e22efad5329a30d6'
      }
    }).then(response => {
      setRecipe({ ...recipe, imageUrl: response.data.data.url });
    }).catch(error => {
      console.error('Error uploading image: ', error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual database submission
    console.log('Recipe submitted: ', recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='recipe-form-container'>
        <div className="general-info">
          <h2>General Information</h2>
          <UploadImage onImageUpload={handleImageUpload} />
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Recipe name"
          />
          <input
            type="text"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            placeholder="Servings"
          />
          <label className="anonymous-label">
            <input
              type="checkbox"
              name="anonymous"
              checked={recipe.anonymous}
              onChange={handleChange}
            />
            Post as Anonymous
          </label>
          <button type="submit">Post Recipe</button>
        </div>

        <div className="ingredients-and-instructions">
          <div className="ingredients">
            <h2>Ingredients</h2>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">
                <input
                  type="text"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Amount"
                />
                <select
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                >
                  <option value="">Select Unit</option>
                  {dummyUnits.map((unit, i) => (
                    <option key={i} value={unit}>{unit}</option>
                  ))}
                </select>
                <select
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                >
                  <option value="">Select Ingredient</option>
                  {dummyIngredients.map((ingredient, i) => (
                    <option key={i} value={ingredient}>{ingredient}</option>
                  ))}
                </select>
                {recipe.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="delete-button"
                    id="addRecipe-delete-button"
                    onClick={() => deleteIngredient(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient}>Add Ingredient</button>
          </div>

          <div className="instructions">
            <h2>Instructions</h2>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="instruction">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e)}
                  placeholder="Instruction"
                />
                {recipe.instructions.length > 1 && (
                  <button
                    type="button"
                    className="delete-button"
                    id="addRecipe-delete-button"
                    onClick={() => deleteInstruction(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addInstruction}>Add Instruction</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecipeForm;
