// RecipeContext.js
import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
   const [apiRecipes, setApiRecipes] = useState([]); //all recipes
   const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);

   const apiKey = import.meta.env.VITE_APP_API_KEY;

   return (
      <RecipeContext.Provider
         value={{
            apiRecipes,
            setApiRecipes,
            recipeOfTheDay,
            setRecipeOfTheDay,
            apiKey,
         }}
      >
         {children}
      </RecipeContext.Provider>
   );
}

export default RecipeProvider;
