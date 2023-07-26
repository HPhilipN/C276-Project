// RecipeContext.js
import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
   const [calledAPI, setCalledAPI] = useState(false);
   const [apiRecipes, setApiRecipes] = useState([]); //all recipes

   useEffect(() => {
      // Check if the recipes already loaded
      const storedCalledAPI = localStorage.getItem("calledAPI");
      const storedAPIRecipes = localStorage.getItem("apiRecipes");

      // JSON parse converts values
      if (storedCalledAPI && storedAPIRecipes) {
         setCalledAPI(JSON.parse(storedCalledAPI));
         setApiRecipes(JSON.parse(storedAPIRecipes));
      }
   }, []);

   useEffect(() => {
      // Save the recipes & calledAPI status in local storage whenever they change
      localStorage.setItem("calledAPI", JSON.stringify(calledAPI));
      localStorage.setItem("apiRecipes", JSON.stringify(apiRecipes));
   }, [calledAPI, apiRecipes]);

   return (
      <RecipeContext.Provider
         value={{
            calledAPI,
            setCalledAPI,
            apiRecipes,
            setApiRecipes,
         }}
      >
         {children}
      </RecipeContext.Provider>
   );
}

export default RecipeProvider;
