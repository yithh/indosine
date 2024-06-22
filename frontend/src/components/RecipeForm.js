import React, { useState, useEffect } from 'react';
import './RecipeForm.css';
import axios from 'axios';
import { ref, set, onValue, get } from 'firebase/database'; // Import get function
import { database } from '../FirebaseConfig';
import UploadImage from './UploadImage';

const dummyUnits = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp'];

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    background: '',
    title: '',
    region: '',
    ingredients: [{ amount: '', unit: '', name: '' }],
    instructions: [''],
    imageUrl: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [regions, setRegions] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');

  useEffect(() => {
    // Fetch available ingredients and regions from the database
    const ingredientsRef = ref(database, 'ingredients');
    onValue(ingredientsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIngredients(Object.keys(data));
      }
    });

    const regionsRef = ref(database, 'regions');
    onValue(regionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRegions(Object.keys(data));
      }
    });
  }, []);

  const standardizeInput = (input, list) => {
    const standardizedInput = input.toLowerCase();
    for (let item of list) {
      if (item.toLowerCase() === standardizedInput) {
        return item;
      }
    }
    return input;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Standardize region
    const standardizedRegion = standardizeInput(recipe.region, regions);

    // Standardize ingredients
    const standardizedIngredients = recipe.ingredients.map(ingredient => ({
      ...ingredient,
      name: standardizeInput(ingredient.name, ingredients),
    }));

    const amountIngredients = standardizedIngredients.map(ingredient => 
      `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`
    );

    const newRecipe = {
      ...recipe,
      region: standardizedRegion,
      ingredients: standardizedIngredients.map(ingredient => ingredient.name),
      amount_ingredients: amountIngredients,
      image: recipe.imageUrl,
    };

    const recipesRef = ref(database, 'recipes');
    const recipesSnapshot = await get(recipesRef);
    const recipeCount = recipesSnapshot.exists() ? Object.keys(recipesSnapshot.val()).length : 0;
    const newRecipeId = recipeCount + 1;

    const newRecipeRef = ref(database, `recipes/${newRecipeId}`);
    await set(newRecipeRef, newRecipe);

    setRecipe({
      background: '',
      title: '',
      region: '',
      ingredients: [{ amount: '', unit: '', name: '' }],
      instructions: [''],
      imageUrl: '',
    });
    setSubmissionMessage('Recipe submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='recipe-form-container'>
        <div className="general-info">
          <h2>General Information</h2>
          <UploadImage onImageUpload={handleImageUpload} />
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Recipe name"
            autoComplete="off"
          />
          <input
            type="text"
            name="region"
            value={recipe.region}
            onChange={handleChange}
            placeholder="Region"
            autoComplete="off"
          />
          <textarea
            name="background"
            value={recipe.background}
            onChange={handleChange}
            placeholder="Description"
            autoComplete="off"
          />
          <button type="submit">Post Recipe</button>
          {submissionMessage && <div className="submission-message">{submissionMessage}</div>}
        </div>

        <div className="ingredients-and-instructions">
          <div className="ingredients">
            <h2>Ingredients</h2>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">
                <input
                  type="number"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Amount"
                  autoComplete="off"
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
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="Ingredient"
                  autoComplete="off"
                />
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
                  autoComplete="off"
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
