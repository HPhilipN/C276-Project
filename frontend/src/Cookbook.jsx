import React, { useContext, useState, useEffect } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import AddRecipe from "./AddRecipe";
import NoRecipesExist from "./NoRecipesExist";
import RecipeList from "./Recipelist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Loader from "./utils/Loader";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "./utils/InfoButton";

// User generated recipes
const Cookbook = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const [recipesExistInDatabase, setRecipesExistInDatabase] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]);

   // redirect to home if logged out
   const navigate = useNavigate();
   if (!isChef && !isModerator) {
      navigate("/");
   }

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
   async function getUserRecipesFromDB(searchTerm) {
      try {
         const response = await fetch("https://replicake.onrender.com/recipes/view", {
            method: "GET",
         });
         const data = await response.json();
         const filteredRecipes = data.filter(recipe => {
            return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
         });
         setUserRecipes(filteredRecipes);
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
            <Filter filteredItems={getUserRecipesFromDB}/>
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
