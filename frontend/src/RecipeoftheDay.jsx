import React, { useState, useEffect } from "react";
import "./styles/RecipeoftheDay.css"; // Import the CSS file
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component

const RecipeoftheDay = () => {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the "Recipe of the Day" data from the API only if it hasn't been fetched yet
    if (!recipeOfTheDay) {
      fetch(
        "https://api.spoonacular.com/recipes/random?apiKey=a96db59e319b4f0386a4d0748670cc2e&number=1"
      )
        .then((response) => response.json())
        .then((data) => {
          // Update the state with the received data
          setRecipeOfTheDay(data.recipes[0]);
          setIsLoading(false); // Set loading to false when data is received
        })
        .catch((error) => {
          console.log("===== ERROR =====");
          console.log(error);
          setIsLoading(false); // Set loading to false if there's an error
        });
    }
  }, [recipeOfTheDay]);

  if (isLoading) {
    // Show the loading spinner while data is being fetched
    return <LoadingSpinner />;
  }

  if (!recipeOfTheDay) {
    // If data is not received and loading is complete, show an error message or fallback UI
    return <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Featured Recipe</h1>
      </div>
      <div className="testimonial-section-bottom">
      <p>Failed to load the featured recipe. Please try again later.</p>
        <div className="recipe-image">
       
        </div>
   
        <div className="ingredients-list">
        </div>
        <div className="about-buttons-container">
        </div>
      </div>
    </div>
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
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeoftheDay;
