import React, { useState, useEffect, useContext } from "react";
import "./styles/RecipeoftheDay.css"; // Import the CSS file
import { RecipeContext } from "./utils/RecipeContext";
import ErrorMesageHome from "./ErrorMessageHome"; // Import the LoadingSpinner component
import { Link } from "react-router-dom";

const RecipeoftheDay = () => {
   const { recipeOfTheDay, setRecipeOfTheDay, apiKey } = useContext(RecipeContext);

   // TODO; getRecipesFromAPI gets called twice
   useEffect(() => {
      // Fetch the "Recipe of the Day" data from the API only if it hasn't been fetched yet
      if (!recipeOfTheDay) {
         console.log("=== fetch recipe of the day ===");
         fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`)
            .then((response) => response.json())
            .then((data) => {
               // Update the state with the received data
               setRecipeOfTheDay(data.recipes[0]);
            })
            .catch((error) => {
               console.log("===== ERROR =====");
               console.log(error);
            });
      }
   }, [recipeOfTheDay]);

   if (recipeOfTheDay === null) {
      // Show the loading spinner while data is being fetched
      return <ErrorMesageHome />;
   }

   return (
      <div className="work-section-wrapper">
         <div className="work-section-top">
            <h1 className="primary-heading">Featured Recipe</h1>
         </div>
         <div className="testimonial-section-bottom">
            <h2>{recipeOfTheDay.title}</h2>
            <div className="recipe-image">
               <img src={recipeOfTheDay.image} alt={recipeOfTheDay.title} />
            </div>
            <p className="primary-text">Prep Time: {recipeOfTheDay.readyInMinutes} minutes</p>
            <div className="ingredients-list">
               <h3>Ingredients:</h3>
               <ul>
                  {recipeOfTheDay.extendedIngredients.slice(0, 5).map((ingredient) => (
                     <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                  {recipeOfTheDay.extendedIngredients.length > 5 && <li>...</li>}
               </ul>
            </div>
            <div className="about-buttons-container">
               <Link className="secondary-button" to={`/recipes/view/${recipeOfTheDay.id}`}>
                  Learn More
               </Link>
            </div>
         </div>
      </div>
   );
};

export default RecipeoftheDay;
