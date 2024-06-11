package main

import (
	"indosine/config"
	"indosine/models/ingredientmodel"
	"indosine/models/recipemodel"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	config.ConnectDB()
	r := mux.NewRouter()
	
	// Recipes
	r.HandleFunc("/api/recipes", recipemodel.GetAllRecipes).Methods("GET")
	r.HandleFunc("/api/recipes/create", recipemodel.CreateRecipe).Methods("POST")
	r.HandleFunc("/api/recipes/getbyingredients", recipemodel.GetRecipeByIngredients).Methods("GET")
	
	// Ingredients
	r.HandleFunc("/api/ingredients", ingredientmodel.GetAllIngredients).Methods("GET")

	log.Println("Server running on port 8080")
	http.ListenAndServe(":8080", r)
}