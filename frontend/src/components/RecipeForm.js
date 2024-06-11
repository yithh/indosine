import React, { useState } from 'react';
import './RecipeForm.css';
import UploadImage from './UploadImage'

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    description: '',
    name: '',
    servings: '',
    anonymous: false,
    ingredients: [{ amount: '', name: '' }],
    instructions: [''],
  });

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
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { amount: '', name: '' }] });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recipe submitted: ', recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="general-info">
        <h2>General Information</h2>
          <UploadImage/>
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
        <label>
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
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Ingredient name"
            />
            {recipe.ingredients.length > 1 && (
              <button
                type="delete"
                className="delete-button"
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
                type="delete"
                className="delete-button"
                onClick={() => deleteInstruction(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addInstruction}>Add Instruction</button>
      </div>
    </form>
  );
}

export default RecipeForm;
