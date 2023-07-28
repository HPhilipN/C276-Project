import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import Loader from "./utils/Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/RecipeDisplay.css";

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
    // `https://replicake.onrender.com/recipes/view/${rid}`
    // /recipes/view/${rid}
    fetch(`https://replicake.onrender.com/recipes/view/${rid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data); // assign retrieved JSON data
        // console.log(recipe);
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

  return (
    <>
      {isChef && <NavbarLogin />}
      {isModerator && <NavbarAdmin />}
      {!isChef && !isModerator && <Navbar />}
      <div className="recipe-display-fullpage">
        <div className="recipe-display">
          <header className="header">
            <h1 className="title">{recipe.title}</h1>
            <div className="author">Author: {recipe.authorName}</div>
            <div className="diff">Difficulty: {recipe.recipeDifficulty}</div>
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
          <div className="tags-display">
            <ul>
              {recipe.tags.map((tag, index) => (
                <li key={index} className="tagItem">
                  {tag}
                </li>
              ))}
            </ul>
          </div >
          <div className="back-button-container">
            {/* Back button */}
            <button onClick={handleBackButtonClick} className="back-button">
               Back to Cookbook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDisplay;
