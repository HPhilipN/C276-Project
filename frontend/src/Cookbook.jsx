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
   const [userHasCreatedRecipes, setUserHasCreatedRecipes] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]);

   //    let userRecipes = [];

   // check if user has created any recipes
   async function checkUserRecipeCount() {
      // `https://replicake.onrender.com/recipes/exists/${userId}`
      // "/recipes/exists/{uid}"
      fetch(`https://replicake.onrender.com/recipes/exists/${userId}`, {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(`Returned value: ${data} from /users/signup`);
            setUserHasCreatedRecipes(data); // assign retrieved data
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
         if (userHasCreatedRecipes) {
            await getUserRecipesFromDB();
         }
      }
      fetchData();
   }, [userId, userHasCreatedRecipes]);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {!signInStatus && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter />
            <Searchbar />
            <AddRecipe refreshUserRecipes={getUserRecipesFromDB} />
         </div>
         <div className="recipelist-wrap">
            {!userHasCreatedRecipes && <NoRecipesExist />}
            {/* check if userRecipes is loaded before rendering */}
            {userHasCreatedRecipes && userRecipes.length > 0 ? (
               <RecipeList recipes={userRecipes} />
            ) : null}
         </div>
      </div>
   );
};

export default Cookbook;
