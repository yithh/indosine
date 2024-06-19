import './AddRecipe.css';
import RecipeForm from '../components/RecipeForm';
import { getDatabase, ref, set, push } from 'firebase/database';

function RecipePage() {
  return (
    <div className="recipePage-main">
      <RecipeForm/>
    </div>
  );
}

export default RecipePage;
