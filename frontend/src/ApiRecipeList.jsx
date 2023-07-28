import React from "react";
import HealthCircle from "./utils/HealthCircle";
import TimerIcon from "@mui/icons-material/Timer";
import "./styles/RecipeList.css";
import { useNavigate } from "react-router-dom";

const ApiRecipeList = ({ recipes }) => {
   const navigate = useNavigate();
   // useNavigate hook to navigate to the desired URL when the button is clicked
   function handleViewRecipe(currRecipe) {
      navigate(`/recipe/view/${currRecipe.id}`);
   }

   return (
      <div className="recipe-list">
         {recipes.map((recipe) => {
            // Extract the first 2 values from dishTypes and diets
            const dishTypesTags = recipe.dishTypes.slice(0, 2);
            const dietsTags = recipe.diets.slice(0, 2);

            // Extract the first item from occasions and cuisines
            const occasionsTag = recipe.occasions[0];
            const cuisinesTag = recipe.cuisines[0];

            // Create an array of tags with non-empty values
            const tags = [...dishTypesTags, ...dietsTags, occasionsTag, cuisinesTag].filter(
               (tag) => tag
            );

            // Extract ingredient names
            const ingredientNames = extendedIngredients.map((ingredient) => ingredient.name);

            <div key={recipe.id} className="card recipe-item">
               <div className="card-header">
                  {/* Favourites button should allow users to add this recipe to their favourites list */}
                  <button className="favourites-parent">
                     <div className="favourites">
                        <TimerIcon fontSize="large" />
                        <p>{recipe.prepTime}</p>
                     </div>
                  </button>
                  <h4 className="card-title">
                     <strong>{recipe.title}</strong>
                  </h4>
                  <h6 className="card-subtitle text-muted">{recipe.sourceName}</h6>
               </div>
               <div className="card-body">
                  <div className="card-text ingredients">
                     <h6>
                        <strong>Ingredients:</strong>
                     </h6>
                     <ul>
                        {ingredientNames.slice(0, 5).map((ingredient, index) => (
                           <li key={index}>{ingredient}</li>
                        ))}
                        {recipe.ingredients.length > 5 && <li>...</li>}
                     </ul>
                  </div>
               </div>
               <div className="after-card-body">
                  <button
                     className="btn btn-light view-recipe-btn"
                     onClick={() => handleViewRecipe(recipe)}
                  >
                     View Full Recipe
                  </button>
                  <div className="difficulty">
                     <HealthCircle healthScore={recipe.healthScore} />
                  </div>
               </div>
               <div className="card-footer text-muted">
                  <ul className="tags">
                     {tags.map((tag, index) => (
                        <li key={index} className="tagItem">
                           {tag}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>;
         })}
      </div>
   );
};

export default ApiRecipeList;
