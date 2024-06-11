package entities

type Recipe struct {
	Id              int
	Name            string
	Description     string
	Duration        int
	TextInstruction string
	ImageURL        string
	Review          string
	Ingredients   	[]string	`json:"ingredients"`
}