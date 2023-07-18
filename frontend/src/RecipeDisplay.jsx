import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "./utils/UserContext";
import "./styles/RecipeDisplay.css";

const RecipeDisplay = () => {
   const { signInStatus, isChef, isModerator, userId } = useContext(UserContext);
   // useParams grabs rid from url
   const { rid } = useParams();
   const [recipe, setRecipe] = useState(null);

   // fetch the desired recipe object
   useEffect(() => {
      // `https://replicake.onrender.com/recipes/view/${rid}`
      // /recipes/view/${rid}
      fetch(`https://replicake.onrender.com/recipes/view/${rid}`, {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            setRecipe(data); // assign retrieved JSON data
            // console.log(recipe);
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }, [rid]);

   // if recipe data isnt populated
   if (!recipe) {
      return (
         <>
            {signInStatus && isChef && <NavbarLogin />}
            {signInStatus && isModerator && <NavbarAdmin />}
            {!signInStatus && <Navbar />}
            <div className="loader">
               <CircularProgress color="success" size={70} />
            </div>
         </>
      );
   }

   return (
      <div className="recipe-display-fullpage">
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {!signInStatus && <Navbar />}
         <div className="recipe-display">
            <header className="header">
               <h1 className="title">{recipe.title}</h1>
               <div className="author">Author: {recipe.authorName}</div>
               <div className="diff">Difficulty: {recipe.recipeDifficulty}</div>
               <div className="favs">Favourites: {recipe.favourites}</div>
            </header>
            <div className="ingredients-display" id="boxing">
               <h3>Ingredients:</h3>
               <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                     <li key={index}>{ingredient}</li>
                  ))}
               </ul>
            </div>
            <div className="instructions-display" id="boxing">
               <h3>Instructions:</h3>
               <ol>
                  {recipe.instructions.map((step, index) => (
                     <li key={index}>{step}</li>
                  ))}
               </ol>
            </div>
            <div className="tags-display" id="boxing">
               <ul>
                  {recipe.tags.map((tag, index) => (
                     <li key={index} className="tagItem">
                        {tag}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default RecipeDisplay;

/*
<h3>Ingredients:</h3>
<ul>
    {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ))}
</ul>
<h3>Instructions:</h3>
<ol>
    {recipe.instructions.map((step, index) => (
        <li key={index}>{step}</li>
    ))}
</ol>
*/
