import React, { useContext, useState, useEffect } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import NoRecipesExist from "./NoRecipesExist";
import RecipeList from "./Recipelist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";
import InfoButton from "./utils/InfoButton";

// Custom hook to call a function only once per session
function useCallOncePerSession(apiFunction) {
   const [isCalled, setIsCalled] = useState(false);

   useEffect(() => {
      console.log("Define isCalled state");
      const hasCalled = sessionStorage.getItem("hasCalled");
      if (!hasCalled) {
         apiFunction();
         setIsCalled(true);
         sessionStorage.setItem("hasCalled", true);
      }
   }, [apiFunction]);

   // Optional: If you want to reset the "isCalled" state when the session ends or tab is closed
   useEffect(() => {
      console.log("Reset isCalled state");
      const resetStateOnSessionEnd = () => {
         sessionStorage.removeItem("hasCalled");
         setIsCalled(false);
      };

      window.addEventListener("beforeunload", resetStateOnSessionEnd);
      return () => {
         window.removeEventListener("beforeunload", resetStateOnSessionEnd);
      };
   }, []);

   return isCalled;
}

// API generated recipes
const Recipes = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const [recipesFetched, setRecipesFetched] = useState(false);
   const [apiRecipes, setApiRecipes] = useState([]); //all recipes
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   const numOfRecipesToFetch = 20;

   // get all recipes from Spoonacular
   async function getRecipesFromAPI() {
      try {
         // "https://replicake.onrender.com/recipes/view"
         // `https://api.spoonacular.com/recipes/random?number=${numOfRecipesToFetch}`
         const response = await fetch("https://replicake.onrender.com/recipes/view", {
            method: "GET",
         });
         if (!response.ok) {
            console.log("===== ERROR =====");
            console.log(response);
            setRecipesFetched(false);
            throw new Error("Failed to fetch user recipes");
         } else {
            setRecipesFetched(true);
         }
         const data = await response.json();
         if (Array.isArray(data)) {
            setApiRecipes(data);
            setFilteredRecipes(data); // copy of recipes to API reduce calls
         } else {
            console.log("Data is not an array:", data);
            setApiRecipes([]);
         }
      } catch (error) {
         console.log("===== ERROR =====");
         console.log(error);
      }
   }

   // search bar functionality
   function filterSearchRecipes(searchTerm) {
      if (Array.isArray(apiRecipes)) {
         const filter = searchTerm
            ? apiRecipes.filter(
                 (recipe) =>
                    recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : apiRecipes;

         setFilteredRecipes(filter);
      } else {
         console.log("Data is not an array:", data);
         setFilteredRecipes([]);
      }
   }

   // Fetch data from Spoonacular
   //useCallOncePerSession(getRecipesFromAPI);
   useEffect(() => {
      console.log("=== UseEffect ===");
      getRecipesFromAPI();
   }, [userId, recipesFetched]);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter filteredItems={filterSearchRecipes} />
            <Searchbar onSearch={filterSearchRecipes} />
         </div>
         <div className="recipelist-wrap">
            {!recipesFetched && <NoRecipesExist />}
            {/* check if apiRecipes is loaded before rendering */}
            {recipesFetched && filteredRecipes.length > 0 ? (
               <>
                  <RecipeList recipes={filteredRecipes} />
               </>
            ) : null}
            {/* Info Button on Bottom Right */}
            <InfoButton />
         </div>
      </div>
   );
};

export default Recipes;
