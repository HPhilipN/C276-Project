// RecipeContext.js
import React, { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
   const [calledAPI, setCalledAPI] = useState(false);
   const [apiRecipes, setApiRecipes] = useState([]); //all recipes
   //    const apiKey = process.env.VITE_APP_API_KEY; // prod key
   const apiKey = import.meta.env.VITE_APP_API_KEY; // dev key

   useEffect(() => {
      // Check if the recipes already loaded
      const storedCalledAPI = localStorage.getItem("calledAPI");
      const storedAPIRecipes = localStorage.getItem("apiRecipes");

      // JSON parse converts values
      if (storedCalledAPI !== null) {
         setCalledAPI(JSON.parse(storedCalledAPI));
      }
      if (storedAPIRecipes !== null) {
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
            apiKey,
         }}
      >
         {children}
      </RecipeContext.Provider>
   );
}

export default RecipeProvider;
