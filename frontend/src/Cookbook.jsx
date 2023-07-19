import React, { useContext, useState, useEffect } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import AddRecipe from "./AddRecipe";
import NoRecipesExist from "./NoRecipesExist";
import RecipeList from "./Recipelist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";
import InfoButton from "./utils/InfoButton";

// User generated recipes
const Cookbook = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const [recipesExistInDatabase, setRecipesExistInDatabase] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]);

   // check if DB has recipes
   async function checkUserRecipeCount() {
      // "https://replicake.onrender.com/recipes/view""
      // /recipes/view
      fetch("/recipes/view", {
         method: "GET",
      })
         .then((response) => {
            if (response.status === 200) {
               setRecipesExistInDatabase(true);
            } else {
               // no recipes exist
               setRecipesExistInDatabase(false);
            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   // get all recipes from DB
   async function getUserRecipesFromDB(searchTerm) {
      try {
         const response = await fetch("/recipes/view", {
            method: "GET",
         });

         if (!response.ok) {
            throw new Error("Failed to fetch user recipes");
         }

         const data = await response.json();
         console.log("Fetched data:", data);

         if (Array.isArray(data)) {
            const filteredRecipes = searchTerm
               ? data.filter(
                    (recipe) =>
                       recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                 )
               : data;

            setUserRecipes(filteredRecipes);
         } else {
            console.log("Data is not an array:", data);
            setUserRecipes([]);
         }
      } catch (error) {
         console.log("===== ERROR =====");
         console.log(error);
      }
   }
   //implement filter functionality

   // TODO figure out how to implement the filter functionality so that we can also use it for other pages
   // run when userId changes
   useEffect(() => {
      async function fetchData() {
         await checkUserRecipeCount();
         if (recipesExistInDatabase) {
            await getUserRecipesFromDB();
         }
      }
      fetchData();
   }, [userId, recipesExistInDatabase]);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter filteredItems={getUserRecipesFromDB} />
            <Searchbar onSearch={getUserRecipesFromDB} />
            <AddRecipe setUserRecipes={setUserRecipes} />
         </div>
         <div className="recipelist-wrap">
            {!recipesExistInDatabase && <NoRecipesExist />}
            {/* check if userRecipes is loaded before rendering */}
            {recipesExistInDatabase && userRecipes.length > 0 ? (
               <RecipeList recipes={userRecipes} />
            ) : null}
            {/* Info Button on Bottom Right */}
         </div>
      </div>
   );
};

export default Cookbook;
