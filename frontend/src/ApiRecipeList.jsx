import React from "react";
import HealthCircle from "./utils/HealthCircle";
import TimerIcon from "@mui/icons-material/Timer";
import "./styles/ApiRecipeList.css";
import { useNavigate } from "react-router-dom";

const ApiRecipeList = ({ recipes }) => {
   const navigate = useNavigate();
   // useNavigate hook to navigate to the desired URL when the button is clicked
   function handleViewRecipe(currRecipe) {
      navigate(`/recipes/view/${currRecipe.id}`);
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

            return (
               <div key={recipe.id} className="card recipe-item">
                  <div className="card-header">
                     {/* Favourites button should allow users to add this recipe to their favourites list */}
                     <div className="preptime">
                        <TimerIcon fontSize="large" />
                        <p>{recipe.readyInMinutes}</p>
                     </div>
                     <h4 className="card-title-api">
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
                           {recipe.extendedIngredients.slice(0, 3).map((ingredient) => (
                              <li key={ingredient.id}>{ingredient.original}</li>
                           ))}
                           {recipe.extendedIngredients.length > 5 && <li>...</li>}
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
               </div>
            );
         })}
      </div>
   );
};

export default ApiRecipeList;
