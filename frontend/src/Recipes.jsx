import React, { useContext, useState, useEffect, useRef } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import NoRecipesExist from "./NoRecipesExist";
import ApiRecipeList from "./ApiRecipeList";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";
import { RecipeContext } from "./utils/RecipeContext";
import InfoButton from "./utils/InfoButton";
import RefreshRecipes from "./RefreshRecipes";
import recipeInfoImg from "./assets/recipe-display.png";

// API generated recipes
const Recipes = () => {
   const { isChef, isModerator } = useContext(UserContext);
   const { apiRecipes, setApiRecipes, apiKey } = useContext(RecipeContext);
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   // Use a ref to track if the API has been called
   const apiCalledRef = useRef(false);

   const numOfRecipesToFetch = 1;

   // get all recipes from Spoonacular
   async function getRecipesFromAPI() {
      console.log("== getRecipesFromAPI ==");
      // "https://replicake.onrender.com/recipes/view" //for testing
      // `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numOfRecipesToFetch}`
      fetch("https://replicake.onrender.com/recipes/view")
         .then((response) => {
            if (!response.ok) {
               console.log("== !response.ok ==");
               console.log(response);
               throw new Error("Failed to fetch user recipes");
            }
            return response.json();
         })
         .then((data) => {
            if (Array.isArray(data)) {
               setApiRecipes(data);
               setFilteredRecipes(data); // copy of recipes to API reduce calls
            } else {
               console.log("Data is not an array:", data);
               setApiRecipes([]);
            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
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
   // TODO; getRecipesFromAPI gets called twice
   useEffect(() => {
      if (filteredRecipes.length <= 0) {
         setFilteredRecipes(apiRecipes);
      }
      if (apiRecipes.length === 0) {
         getRecipesFromAPI();
      }
   }, [setApiRecipes]);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter filteredItems={filterSearchRecipes} />
            <Searchbar onSearch={filterSearchRecipes} />
            <RefreshRecipes />
         </div>
         <div className="recipelist-wrap">
            {/* check if apiRecipes is loaded before rendering */}
            {filteredRecipes.length > 0 ? (
               <>
                  <ApiRecipeList recipes={filteredRecipes} />
               </>
            ) : (
               <NoRecipesExist />
            )}
            {/* Info Button on Bottom Right */}
            <InfoButton />
         </div>
      </div>
   );
};

export default Recipes;
