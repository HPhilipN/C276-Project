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
import { RecipeContext } from "./utils/RecipeContext";
import InfoButton from "./utils/InfoButton";

// API generated recipes
const Recipes = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const { calledAPI, setCalledAPI, apiRecipes, setApiRecipes } = useContext(RecipeContext);
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   const numOfRecipesToFetch = 20;

   // get all recipes from Spoonacular
   async function getRecipesFromAPI() {
      console.log("== getRecipesFromAPI ==");
      try {
         if (apiRecipes.length > 0) {
            // Data is already available, no need to fetch again
            setCalledAPI(true);
            setFilteredRecipes(apiRecipes);
         } else {
            // "https://replicake.onrender.com/recipes/view"
            // `https://api.spoonacular.com/recipes/random?number=${numOfRecipesToFetch}`
            const response = await fetch("https://replicake.onrender.com/recipes/view", {
               method: "GET",
            });
            if (!response.ok) {
               console.log("===== ERROR =====");
               console.log(response);
               throw new Error("Failed to fetch user recipes");
            }

            const data = await response.json();
            if (Array.isArray(data)) {
               setApiRecipes(data);
               setFilteredRecipes(data); // copy of recipes to API reduce calls
               setCalledAPI(true); // true after successful API call
            } else {
               console.log("Data is not an array:", data);
               setApiRecipes([]);
            }
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
   useEffect(() => {
      console.log("== UseEffect ==");
      if (filteredRecipes.length <= 0) {
         setFilteredRecipes(apiRecipes);
      }
      if (!calledAPI) {
         getRecipesFromAPI();
      }
   }, [calledAPI]);

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
            {/* check if apiRecipes is loaded before rendering */}
            {filteredRecipes.length > 0 ? (
               <>
                  <RecipeList recipes={filteredRecipes} />
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
