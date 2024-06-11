package recipemodel

import (
	"encoding/json"
	"fmt"
	"indosine/config"
	"indosine/entities"
	"log"
	"net/http"
	"strings"
)

func GetAllRecipes(w http.ResponseWriter, r *http.Request) {
	rows, err := config.DB.Query("SELECT * FROM recipes")
	if err != nil{
		panic(err)
	}
	defer rows.Close()

	var recipes []entities.Recipe

	var ingredientsJSON string

	for rows.Next(){
		var recipe entities.Recipe
		err := rows.Scan(&recipe.Id, &recipe.Name, &recipe.Description, &recipe.Duration, &recipe.TextInstruction, &recipe.ImageURL, &recipe.Review, &ingredientsJSON)
		if err != nil{
			panic(err)
		}
	if err := json.Unmarshal([]byte(ingredientsJSON), &recipe.Ingredients); err != nil {
		log.Fatal(err)
	}
		recipes = append(recipes, recipe)
	}
	
	json.NewEncoder(w).Encode(recipes)
}

func CreateRecipe(w http.ResponseWriter, r *http.Request){
	
	var recipe entities.Recipe
	// Decode the JSON request body into the recipe struct
	err := json.NewDecoder(r.Body).Decode(&recipe)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ingredientsJSON, err := json.Marshal(recipe.Ingredients)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := config.DB.Exec(`
		INSERT INTO recipes (
			name, description, duration, textInstruction, imageURL, review, ingredients
		) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		recipe.Name,
		recipe.Description,
		recipe.Duration,
		recipe.TextInstruction,
		recipe.ImageURL,
		recipe.Review,
		ingredientsJSON,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the result of the insertion
	json.NewEncoder(w).Encode(result)
}

func GetRecipeByIngredients(w http.ResponseWriter, r *http.Request){
	ingredientParams := r.URL.Query().Get("ingredients")
	fmt.Println(ingredientParams)
	if len(ingredientParams) == 0 {
		http.Error(w, "Missing ingredient_id query parameter", http.StatusBadRequest)
		return
	}

	ingredientIDs := strings.Split(ingredientParams, ",")
	if len(ingredientIDs) == 0 {
		http.Error(w, "Invalid ingredients query parameter", http.StatusBadRequest)
		return
	}

	var conditions []string
	for _, id := range ingredientIDs {
		conditions = append(conditions, fmt.Sprintf("JSON_CONTAINS(ingredients, '%s')", id))
		print(id)
	}
	query := fmt.Sprintf(`
		SELECT *
		FROM recipes 
		WHERE %s`, strings.Join(conditions, " OR "))
	fmt.Println(query)
	
	// Execute the SQL query
	rows, err := config.DB.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var recipes []entities.Recipe
	for rows.Next() {
		var recipe entities.Recipe
		var ingredientsIdJSON []byte

		if err := rows.Scan(&recipe.Id, &recipe.Name, &recipe.Description, &recipe.Duration, &recipe.TextInstruction, &recipe.ImageURL, &recipe.Review, &ingredientsIdJSON); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if err := json.Unmarshal(ingredientsIdJSON, &recipe.Ingredients); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		recipes = append(recipes, recipe)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(recipes)
}