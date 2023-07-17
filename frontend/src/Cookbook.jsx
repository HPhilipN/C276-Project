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

// User generated recipes
const Cookbook = () => {
   const { signInStatus, isChef, isModerator, userId } = useContext(UserContext);
   const [recipesExistInDatabase, setRecipesExistInDatabase] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]);

   //Todo: userHasCreatedRecipes is redundant as user should be able to view
   //todo: recipes created by other users anyway, should check if recipe table is empty

   // check if DB has recipes
   async function checkUserRecipeCount() {
      // "https://replicake.onrender.com/recipes/view""
      // /recipes/view
      fetch("https://replicake.onrender.com/recipes/view", {
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
   async function getUserRecipesFromDB() {
      try {
         // "https://replicake.onrender.com/recipes/view"
         // "/recipes/view"
         const response = await fetch("https://replicake.onrender.com/recipes/view", {
            method: "GET",
         });
         const data = await response.json();
         setUserRecipes(data);
      } catch (error) {
         console.log("===== ERROR =====");
         console.log(error);
      }
   }

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
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {!signInStatus && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter />
            <Searchbar />
            <AddRecipe setUserRecipes={setUserRecipes} />
         </div>
         <div className="recipelist-wrap">
            {!recipesExistInDatabase && <NoRecipesExist />}
            {/* check if userRecipes is loaded before rendering */}
            {recipesExistInDatabase && userRecipes.length > 0 ? (
               <RecipeList recipes={userRecipes} />
            ) : null}
         </div>
      </div>
   );
};

export default Cookbook;
