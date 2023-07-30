// PrintableRecipe.js
import React from "react";
// import "./styles/PrintableRecipe.css"; // Import the CSS file for PrintableRecipe

const PrintableRecipe = ({ recipe }) => {
  return (
    <div className="printable-recipe">
      <h1>{recipe.title}</h1>
      <div>Author: {recipe.authorName}</div>
      <div>Difficulty: {recipe.recipeDifficulty}</div>
      <div>Preparation Time: {recipe.prepTime} min</div>
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
      <h3>Tags:</h3>
      <ul>
        {recipe.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrintableRecipe;
