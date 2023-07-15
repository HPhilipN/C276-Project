import React, { useContext, useState } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import AddRecipe from "./AddRecipe";
import Recipelist from "./Recipelist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";

// User generated recipes
const Cookbook = () => {
   const { signInStatus, isChef, isModerator, userId } = useContext(UserContext);
   const [userHasCreatedRecipes, setUserHasCreatedRecipes] = useState(false);

   // check if user has created any recipes
   async function checkUserRecipeCount() {
      // "https://replicake.onrender.com/recipes/exists/{uid}"
      // "/recipes/exists/{uid}"
      fetch(`https://replicake.onrender.com/recipes/exists/5`, {
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

   checkUserRecipeCount(); // this only has to run once

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
            {/*Recipe List*/}
            <Recipelist />
            <div>
               <h4>TEMPORARY TEXT</h4>
               <p>This is where User recipes will be displayed</p>
            </div>
         </div>
      </div>
   );
};

export default Cookbook;
