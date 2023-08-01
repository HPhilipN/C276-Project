import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Loader from "./utils/Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/RecipeDisplay.css";
import printJS from "print-js";
import Disqus from "disqus-react";

const RecipeDisplay = () => {
  const { isChef, isModerator, userId } = useContext(UserContext);
  // useParams grabs rid from url
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);

  // redirect to home if logged out
  const navigate = useNavigate();
  if (!isChef && !isModerator) {
    navigate("/");
  }

  // fetch the desired recipe object
  useEffect(() => {
    fetch(`https://replicake.onrender.com/recipes/view/${rid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data); // assign retrieved JSON data
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
    navigate("/cookbook"); // Navigate to "/cookbooks" page
  };

  // Function to handle the print action
  const handlePrint = () => {
    printJS({
      printable: "printable-content",
      type: "html",
      css: null, // You can pass CSS file URLs if needed
      style: null, // You can pass custom styles here
      scanStyles: true, // Set to false if you don't want to process styles
      targetStyles: ["*"], // Process all styles
      ignoreElements: ["back-button", "print-button","tag-display"], // Array of HTML ids to ignore when printing
      documentTitle: "Recipe", // Document title when printing
    });
  };

  const disqusShortname = "replicake-1";
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
      <div className="recipe-display-fullpage" id="printable-content">
        <div id="recipe-display" className="recipe-display">
          <header className="header">
            <h1 className="title">{recipe.title}</h1>
            <div className="author">Author: {recipe.authorName}</div>
            <div className="diff">Difficulty: {recipe.recipeDifficulty}</div>
            <div className="favs">Preparation Time: {recipe.prepTime}min</div>
          </header>
          <div className="ingredients-display">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="instructions-display">
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div id="tag-display" className="tags-display">
            <ul>
              {recipe.tags.map((tag, index) => (
                <li key={index} className="tagItem">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
            {/* Back button */}
            <button id="back-button" onClick={handleBackButtonClick} className="back-button">
              Back to Cookbook
            </button>
            {/* Print button */}
            <button id="print-button" onClick={handlePrint} className="print-button">
              Print Recipe
            </button>
          </div>
        </div>
      </div>
      {/* Gray box container for Disqus commenting system */}
      <div className="disqus-container">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};

export default RecipeDisplay;
