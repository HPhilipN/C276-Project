import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Loader from "./utils/Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/RecipeDisplay.css";
import { RecipeContext } from "./utils/RecipeContext";

// TODO
const ApiRecipeDisplay = () => {
   const { isChef, isModerator } = useContext(UserContext);
   const { apiKey } = useContext(RecipeContext);
   // useParams grabs rid from url
   const { rid } = useParams();
   const [recipe, setRecipe] = useState(null);

   let tags, ingredientNames, instructionSteps;

   // redirect to home if logged out
   const navigate = useNavigate();
   if (!isChef && !isModerator) {
      navigate("/");
   }

   // fetch the desired recipe object
   useEffect(() => {
      // `https://replicake.onrender.com/recipes/view/${rid}`
      // `https://api.spoonacular.com/recipes/${rid}/information?apiKey=${apiKey}`
      fetch(`https://replicake.onrender.com/recipes/view/${rid}`, {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            setRecipe(data); // assign retrieved JSON data
            // console.log(recipe);
         })
         .then(() => {
            // Extract the first 2 values from dishTypes and diets
            const dishTypesTags = recipe.dishTypes.slice(0, 2);
            const dietsTags = recipe.diets.slice(0, 2);

            // Extract the first item from occasions and cuisines
            const occasionsTag = recipe.occasions[0];
            const cuisinesTag = recipe.cuisines[0];

            // Create an array of tags with non-empty values
            tags = [...dishTypesTags, ...dietsTags, occasionsTag, cuisinesTag].filter((tag) => tag);

            // Extract ingredient names
            ingredientNames = extendedIngredients.map((ingredient) => ingredient.name);

            // Extract instruction steps
            instructionSteps = analyzedInstructions[0].steps.map((s) => s.step);
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }, [rid]);

   // if recipe data isn't populated
   if (!recipe) {
      return <Loader />;
   }

   // Handle back button click
   const handleBackButtonClick = () => {
      navigate("/recipes"); // Navigate to "/recipes" page
   };

   return (
      <div className="display-fullpage">
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="recipe-display-fullpage">
            <div className="recipe-display">
               <header className="header">
                  <h1 className="title">{recipe.title}</h1>
                  <div className="author">Author: {recipe.authorName}</div>
                  <div className="diff">Difficulty: {recipe.recipeDifficulty}</div>
                  <div className="favs">Preparation Time: {recipe.prepTime}min</div>
               </header>
               <div className="ingredients-display">
                  <h3>Ingredients:</h3>
                  <ul>
                     {ingredientNames.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                     ))}
                  </ul>
               </div>
               <div className="instructions-display">
                  <h3>Instructions:</h3>
                  <ol>
                     {instructionSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                     ))}
                  </ol>
               </div>
               <div className="tags-display">
                  <ul>
                     {tags.map((tag, index) => (
                        <li key={index} className="tagItem">
                           {tag}
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="back-button-container">
                  {/* Back button */}
                  <button onClick={handleBackButtonClick} className="back-button">
                     Back to Cookbook
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApiRecipeDisplay;
