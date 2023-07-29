import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Loader from "./utils/Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { RecipeContext } from "./utils/RecipeContext";
import { useNavigate } from "react-router-dom";
import "./styles/ApiRecipeDisplay.css";

const ApiRecipeDisplay = () => {
   const { isChef, isModerator } = useContext(UserContext);
   const { apiKey } = useContext(RecipeContext);
   // useParams grabs rid from url
   const { rid } = useParams();
   const [recipe, setRecipe] = useState(null);
   const [tags, setTags] = useState([]);

   // redirect to home if logged out
   const navigate = useNavigate();
   if (!isChef && !isModerator) {
      navigate("/");
   }

   // fetch the desired recipe object
   useEffect(() => {
      // `https://replicake.onrender.com/recipes/view/${rid}`
      // `https://api.spoonacular.com/recipes/${rid}/information?apiKey=${apiKey}`
      fetch(`https://api.spoonacular.com/recipes/${rid}/information?apiKey=${apiKey}`, {
         method: "GET",
      })
         .then((response) => response.json())
         .then((data) => {
            setRecipe(data); // assign retrieved JSON data
            // console.log(data);

            const dishTypesTags = data.dishTypes;
            const dietsTags = data.diets;
            const occasionsTag = data.occasions;
            const cuisinesTag = data.cuisines;
            // Create an array of tags with non-empty values
            const newTags = [...dishTypesTags, ...dietsTags, occasionsTag, cuisinesTag].filter(
               (tag) => tag
            );
            setTags(newTags);
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
                  <div className="author">Source: {recipe.sourceName}</div>
                  <div className="diff">Health Score: {recipe.healthScore}</div>
                  <div className="favs">Preparation Time: {recipe.readyInMinutes}min</div>
               </header>
               <div className="ingredients-display">
                  <h3>Ingredients:</h3>
                  <ul>
                     {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                     ))}
                  </ul>
               </div>
               <div className="api-instructions-display">
                  <h3>Instructions:</h3>
                  <ol>
                     {recipe.analyzedInstructions[0].steps.map((instruction) => (
                        <li key={instruction.number}>{instruction.step}</li>
                     ))}
                  </ol>
               </div>
               <div className="tags-display">
                  {tags.length > 0 ? (
                     <ul>
                        {tags.map((tag, index) => (
                           <li key={index} className="tagItem">
                              {tag}
                           </li>
                        ))}
                     </ul>
                  ) : (
                     <p>No tags available</p>
                  )}
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
