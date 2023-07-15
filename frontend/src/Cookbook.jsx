import React, { useContext, useState, useEffect } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import AddRecipe from "./AddRecipe";
import NoRecipesExist from "./NoRecipesExist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";

// User generated recipes
const Cookbook = () => {
   const { signInStatus, isChef, isModerator, userId, nameValue } = useContext(UserContext);
   const [userHasCreatedRecipes, setUserHasCreatedRecipes] = useState(false);

   let userRecipes;

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

   // check if user has created any recipes
   async function getUserRecipesFromDB() {
      // "https://replicake.onrender.com/recipes/view"
      // "/recipes/view"
      fetch("https://replicake.onrender.com/recipes/view", {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            userRecipes = data; // assign retrieved data
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   // run checkUserRecipeCount when userId changes
   useEffect(() => {
      checkUserRecipeCount();
      getUserRecipesFromDB();
   }, [userId]);

   const showUserRecipes = (
      <div className="recipe-display">
         <h1>USER RECIPES HERE</h1>
         <p>filler text</p>
      </div>
   );

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {!signInStatus && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter />
            <Searchbar />
            <AddRecipe />
         </div>
         <div className="recipelist-wrap">
            {!userHasCreatedRecipes && <NoRecipesExist />}
            {userHasCreatedRecipes && showUserRecipes}
         </div>
      </div>
   );
};

export default Cookbook;
