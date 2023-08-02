import React, { useContext, useState, useEffect, useRef } from "react";
import FilterRecipes from "./FilterRecipes";
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
import Pagination from "./Pagination";

// API generated recipes
const Recipes = () => {
   const { isChef, isModerator } = useContext(UserContext);
   const { apiRecipes, setApiRecipes, apiKey } = useContext(RecipeContext);
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   const numOfRecipesToFetch = 36;

   // State to manage pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setpostsPerPage] = useState(8);

   // get all recipes from Spoonacular
   async function getRecipesFromAPI() {
      console.log("== getRecipesFromAPI ==");
      // "https://replicake.onrender.com/recipes/view" //for testing
      // `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numOfRecipesToFetch}`
      fetch(
         `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numOfRecipesToFetch}`
      )
         .then((response) => {
            if (!response.ok) {
               console.log("== !response.ok ==");
               console.log(response);
               throw new Error("Failed to fetch user recipes");
            }
            return response.json();
         })
         .then((data) => {
            if (Array.isArray(data.recipes)) {
               setApiRecipes(data.recipes);
               setFilteredRecipes(data.recipes); // copy of recipes to API reduce calls
            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   // filter functionality
   const filterRecipes = (filteredArray) => {
      if (filteredArray.length == 3 && Array.isArray(filteredArray)) {
         const newRecipes = apiRecipes.filter((recipe) => {
            // 165 prep time is just infinity
            const prepTime = filteredArray[0] != 165 ? filteredArray[0] : Infinity;
            const healthiness = filteredArray[1];
            const noCuisine = filteredArray[2] == "";
            return (
              recipe.readyInMinutes <= prepTime && 
              recipe.healthScore >= healthiness &&
              (recipe.cuisines.includes(filteredArray[2]) || noCuisine)
            );
         });
         setFilteredRecipes(newRecipes);
      }
      else {
         console.log("The filter is not the right shape");
         return apiRecipes;
      };
   };
   // search bar functionality
   const searchRecipes = (searchTerm) => {
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
   };

   // Fetch data from Spoonacular
   useEffect(() => {
      if (apiRecipes.length === 0) {
         getRecipesFromAPI();
      }
   }, [apiRecipes, setApiRecipes]);

   // Set filtered recipe to stored apiRecipes
   useEffect(() => {
      setFilteredRecipes(apiRecipes);
      //   console.log(apiRecipes);
   }, []);

   // calculate first and last post to be displayed on current page
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   //hide data that is not shown
   const currentPost = filteredRecipes.slice(firstPostIndex, lastPostIndex);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <FilterRecipes filteredItems={filterRecipes} />
            <Searchbar onSearch={searchRecipes} />
            <RefreshRecipes />
         </div>
         <div className="recipelist-wrap">
            {/* check if apiRecipes is loaded before rendering */}
            {filteredRecipes.length > 0 ? (
               <>
                  <ApiRecipeList recipes={currentPost} />
                  {/* Pagination here - grab current content on page and display */}
                  <Pagination
                     totalPosts={filteredRecipes.length}
                     postsPerPage={postsPerPage}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage}
                  />
               </>
            ) : (
               <NoRecipesExist />
            )}
            {/* Info Button on Bottom Right */}
            <InfoButton InfoImg={recipeInfoImg} />
         </div>
      </div>
   );
};

export default Recipes;
