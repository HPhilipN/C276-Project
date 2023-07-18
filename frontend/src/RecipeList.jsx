import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DifficultyCircle from "./utils/DifficultyCircle";
import "./styles/RecipeList.css";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipes }) => {
   const navigate = useNavigate();
   // useNavigate hook to navigate to the desired URL when the button is clicked
   function handleViewRecipe(currRecipe) {
      navigate(`/cookbook/view/${currRecipe.rid}`);
   }

   return (
      <div className="recipe-list">
         {recipes.map((recipe) => (
            <div key={recipe.rid} className="card recipe-item">
               <div className="card-header">
                  {/* Favourites button should allow users to add this recipe to their favourites list */}
                  <button className="favourites-parent">
                     <div className="favourites">
                        <StarOutlineIcon fontSize="large" />
                        <p>{recipe.favourites}</p>
                     </div>
                  </button>
                  <h4 className="card-title">
                     <strong>{recipe.title}</strong>
                  </h4>
                  <h6 className="card-subtitle text-muted">{recipe.authorName}</h6>
               </div>
               <div className="card-body">
                  <div className="card-text ingredients">
                     <h6>
                        <strong>Ingredients:</strong>
                     </h6>
                     <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                           <li key={index}>{ingredient}</li>
                        ))}
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
                     <DifficultyCircle difficulty={recipe.recipeDifficulty} />
                  </div>
               </div>
               <div className="card-footer text-muted">
                  <ul className="tags">
                     {recipe.tags.map((tag, index) => (
                        <li key={index} className="tagItem">
                           {tag}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         ))}
      </div>
   );
};

export default RecipeList;
