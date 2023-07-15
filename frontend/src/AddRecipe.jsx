import React, { useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Components from "./utils/Components";
import Slider from "@mui/material/Slider";
import { UserContext } from "./utils/UserContext";
import { capitalizeEveryWord } from "./utils/utils";
import "./styles/AddRecipe.css";

// User generated recipes
const AddRecipe = () => {
   const { userId } = useContext(UserContext);
   const [showModal, setShowModal] = useState(false); // bool
   const [title, setTitle] = useState(""); // string
   const [recipeDifficulty, setRecipeDiff] = useState(); // int
   const [ingredients, setIngredients] = useState([]); // array
   const [instructions, setInstructions] = useState([]); // array
   const [tags, setTags] = useState([]); // array

   function handleAddButtonClick(event) {
      event.preventDefault(); // prevent page refresh
      setShowModal(!showModal);
      console.log("Add Button / Submit Button clicked");
   }

   // handle input grabbing
   function getTitle(event) {
      let tempTitle = event.target.value;
      tempTitle = tempTitle.toLowerCase();
      setTitle(capitalizeEveryWord(tempTitle));
      console.log(title);
   }
   function getRecipeDiff(event) {
      console.log(event.target.value);
      setRecipeDiff(event.target.value);
   }

   // create recipe helper functions
   function createRecipeObjectFromInputs() {
      newUser = {
         authorId: userId,
         title: title,
         recipeDifficulty: recipeDifficulty,
         favourites: 0, // favourited 0 times by default
         ingredients: ingredients,
         instructions: instructions,
         tags: tags,
      };
   }

   return (
      <>
         <button className="add-btn" onClick={handleAddButtonClick}>
            <AddCircleIcon sx={{ fontSize: 40 }} className="add-btn-icon" />
            Add
         </button>
         <div className="add-recipe">
            <form className="add-recipe-form">
               <Components.Title>Create Recipe</Components.Title>
               {/* Input fields for recipe attributes */}
               <div className="inputs">
                  <Components.Input
                     type="text"
                     placeholder="Title"
                     onChange={getTitle}
                     className="text-center"
                  />
                  <div className="SliderInput">
                     <h6>Recipe Difficulty</h6>
                     <Slider
                        aria-labelledby="recipe difficulty"
                        defaultValue={5}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        min={0}
                        max={10}
                        onChange={getRecipeDiff}
                     />
                  </div>
               </div>

               <Components.Button className="btn-hover" onClick={handleAddButtonClick}>
                  Add to Cookbook
               </Components.Button>
            </form>
         </div>
      </>
   );
};

export default AddRecipe;
