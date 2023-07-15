import React from "react";

const RecipeList = ({ recipes }) => {
   return (
      <div className="recipe-list">
         {recipes.map((recipe) => (
            <div key={recipe.rid} className="card text-center recipe-item">
               <h2 className="card-header">{recipe.title}</h2>
               <div className="card-body">
                  <p className="card-text">Recipe Difficulty: {recipe.recipeDifficulty}</p>
                  <p className="card-text">Favorites: {recipe.favourites}</p>
                  <ul className="tags">
                     {recipe.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                     ))}
                  </ul>
                  <a href="#" className="btn btn-primary">
                     View Full Recipe
                  </a>
               </div>
               <div className="card-footer text-muted">Creator Name</div>
            </div>
         ))}
      </div>
   );
};

export default RecipeList;

/*
<div key={recipe.rid}>
    <h2>{recipe.title}</h2>
    <p>Recipe Difficulty: {recipe.recipeDifficulty}</p>
    <p>Favorites: {recipe.favourites}</p>
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
*/
