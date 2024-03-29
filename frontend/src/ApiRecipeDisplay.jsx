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
import printJS from "print-js";
import Disqus from "disqus-react";

const ApiRecipeDisplay = () => {
   const { isChef, isModerator } = useContext(UserContext);
   const { apiKey } = useContext(RecipeContext);
   // useParams grabs rid from url
   const { rid } = useParams();
   const [recipe, setRecipe] = useState(null);
   const [tags, setTags] = useState([]);

   // redirect to home if logged out
   const navigate = useNavigate();
   // fetch the desired recipe object
   useEffect(() => {
      console.log("== API Recipe Display ==");
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
            const newTags = [...dishTypesTags, ...dietsTags, ...occasionsTag, ...cuisinesTag];
            // Remove empty strings and empty values from newTags array
            const filteredTags = newTags.filter(
               (tag) => tag !== "" && tag !== null && tag !== undefined
            );
            console.log(filteredTags);

            setTags(filteredTags);
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

   const handlePrint = () => {
      printJS({
         printable: "printable-content",
         type: "html",
         css: null,
         style: null,
         scanStyles: true,
         targetStyles: ["*"],
         ignoreElements: ["back-button", "print-button", "tags-display"],
         documentTitle: "Recipe",
      });
   };

   const disqusShortname = "replicake";
   const disqusConfig = {
      url: `https://replicake.onrender.com/recipes/view/${rid}`,
      identifier: `recipe_${rid}`,
      title: recipe.title,
   };

   return (
      <div className="display-fullpage">
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div id="printable-content" className="recipe-display-fullpage">
            <div id="recipe-display" className="recipe-display">
               <div className="printable">
                  <header className="header">
                     <h1 className="title">{recipe.title}</h1>
                     <div className="author">Source: {recipe.sourceName}</div>
                     <div className="diff">Health Score: {recipe.healthScore}</div>
                     <div className="favs">Preparation Time: {recipe.readyInMinutes}min</div>
                  </header>
                  <div className="printable-instructions-and-ingredients">
                     <div className="ingredients-display">
                        <h3>Ingredients:</h3>
                        <ul>
                           {recipe.extendedIngredients.map((ingredient, index) => (
                              <li key={ingredient.id}>{ingredient.original}</li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="api-instructions-display">
                     <h3>Instructions:</h3>
                     <ol>
                        {recipe.analyzedInstructions[0].steps.map((instruction) => (
                           <li key={instruction.number}>{instruction.step}</li>
                        ))}
                     </ol>
                  </div>
                  <div id="tags-display" className="tags-display">
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
                  <div className="button-container">
                     {/* Back button */}
                     <button
                        id="back-button"
                        onClick={handleBackButtonClick}
                        className="back-button"
                     >
                        Back to Recipes
                     </button>
                     {/* Print button */}
                     <button id="print-button" onClick={handlePrint} className="print-button">
                        Print Recipe
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {/* Gray box container for Disqus commenting system */}
         <div className="disqus-container">
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
         </div>
      </div>
   );
};

export default ApiRecipeDisplay;
