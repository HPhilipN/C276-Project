//MyRecipes.jsx displays all recipes made by logged in user on Profile/Settings page

import React, { useState, useEffect, useContext } from "react";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import TimerIcon from "@mui/icons-material/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import NoRecipesExist from "./NoRecipesExist";
import "./styles/MyRecipes.css";

const MyRecipes = () => {
   const { userId } = useContext(UserContext);
   const [userRecipes, setUserRecipes] = useState([]);
   const [hasRecipes, setHasRecipes] = useState(false);
   const navigate = useNavigate();

   // get the recipe data
   useEffect(() => {
      // `https://replicake.onrender.com/recipes/find/${userId}`
      // /recipes/find/{userId}
      fetch(`https://replicake.onrender.com/recipes/find/${userId}`, {
         method: "GET",
      })
         .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
               console.log("User recipes found");
               return response.json(); // Parse JSON data
            } else if (response.status === 204) {
               console.log("This user has no recipes");
               setHasRecipes(false);
               return;
            }
         })
         .then((data) => {
            // Assign retrieved JSON data to userRecipes
            if (data) {
               setHasRecipes(true);
               setUserRecipes(data);
            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }, [userId]);

   // should redirect to full recipe view cookbook/view/rid
   function displayRecipe(rid) {
      console.log("in progress");
      navigate(`/cookbook/view/${rid}`);
   }

   // deletes recipe from the cookbook based on passed rid
   async function deleteRecipe(rid) {
      console.log(rid);
      fetch(`https://replicake.onrender.com/recipes/delete/${rid}`, {
         method: "DELETE",
      })
         .then((response) => response.json()) // parse JSON response
         .then((data) => {
            console.log(`Returned value: ${data} from /users/`);
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   const recipeDisplay = (
      <div className="user-recipe-box">
         <table className="user-recipe-table">
            <thead>
               <tr>
                  <th>Recipe</th>
                  <th>Prep Time</th>
                  <th className="manage-th">Manage</th>
               </tr>
            </thead>
            <tbody>
               {userRecipes.map((recipe) => (
                  <tr className="user-recipe-row" key={recipe.rid}>
                     <td>
                        <FontAwesomeIcon icon={faKitchenSet} /> {recipe.title}
                     </td>
                     <td>
                        <TimerIcon /> {recipe.prepTime}
                     </td>
                     <td>
                        <button
                           className="view-btn btn-hover"
                           onClick={() => displayRecipe(recipe.rid)}
                        >
                           View
                        </button>
                        <button
                           className="delete-btn btn-hover"
                           onClick={() => deleteRecipe(recipe.rid)}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

   return (
      <div>
         {/* check if userRecipes is loaded before rendering */}
         {hasRecipes && recipeDisplay}
         {!hasRecipes && <NoRecipesExist />}
      </div>
   );
};

export default MyRecipes;
