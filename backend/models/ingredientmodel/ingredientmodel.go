package ingredientmodel

import (
	"encoding/json"
	"indosine/config"
	"indosine/entities"
	"net/http"
)

func GetAllIngredients(w http.ResponseWriter, r *http.Request) {
	rows, err := config.DB.Query("SELECT * FROM ingredients")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var ingredients []entities.Ingredient

	for rows.Next() {
		var ingredient entities.Ingredient
		err := rows.Scan(&ingredient.Id, &ingredient.Name)
		if err != nil {
			panic(err)
		}
		ingredients = append(ingredients, ingredient)
	}

	json.NewEncoder(w).Encode(ingredients)
}