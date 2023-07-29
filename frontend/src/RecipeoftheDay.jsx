import React, { useState, useEffect, useContext } from "react";
import "./styles/RecipeoftheDay.css"; // Import the CSS file
import { RecipeContext } from "./utils/RecipeContext";
import { useNavigate } from "react-router-dom";

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
   }, []);

   if (recipeOfTheDay === null) {
      // If data is not received and loading is complete, show an error message or fallback UI
      return (
         <div className="work-section-wrapper">
            <div className="work-section-top">
               <h1 className="primary-heading">Featured Recipe</h1>
            </div>
            <div className="testimonial-section-bottom">
               <p>Failed to load the featured recipe. Please try again later.</p>
               <div className="recipe-image"></div>

               <div className="ingredients-list"></div>
               <div className="about-buttons-container"></div>
            </div>
         </div>
      );
   }
   const navigate = useNavigate();
   // useNavigate hook to navigate to the desired URL when the button is clicked
   function handleViewRecipe(recipeOfTheDay) {
      navigate(`/recipes/view/${recipeOfTheDay.id}`);
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
               <button className="secondary-button"  onClick={() => handleViewRecipe(recipeOfTheDay)}>Learn More</button>
            </div>
         </div>
      </div>
   );
};

export default RecipeoftheDay;
