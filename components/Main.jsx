import React from "react"

import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from "./IngredientsList"

import {getRecipeFromMistral } from "../Ai"

export default function Main() {

    const [ingredients, setIngredients] = React.useState([]);

    let [isBtnClicked , setIsBtnClicked] = React.useState(false)

    const [recipe, setRecipe] = React.useState(); 

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function apiCall(){
        setIsBtnClicked(isBtnClicked = true)

        const result = await getRecipeFromMistral(ingredients);
        setRecipe(result);
        console.log(result); 
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            
            {ingredients.length > 0 ? 
                <IngredientsList  
                    ingredients = {ingredients}
                    onClick={apiCall}
                />  : null}

            {isBtnClicked && < ClaudeRecipe recipe = {recipe} />}
        </main>
    )
}
