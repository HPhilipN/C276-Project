import React, { useState, useContext, useRef, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Components from "./utils/Components";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "./utils/UserContext";
import { capitalizeEveryWord } from "./utils/utils";
import { TagsInput } from "react-tag-input-component";
import "./styles/AddRecipe.css";

// User generated recipes
const AddRecipe = () => {
   const { userId } = useContext(UserContext);
   const [title, setTitle] = useState(""); // string
   const [recipeDifficulty, setRecipeDiff] = useState(5); // int
   const [ingredients, setIngredients] = useState([]); // array
   const [instructions, setInstructions] = useState([]); // array
   const [tags, setTags] = useState([]); // array

   let newRecipe;

   // handle modal visibility
   const [showModal, setShowModal] = useState(false);
   const modalRef = useRef(null);
   // if click outside modal, close modal
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

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
   }
   function getRecipeDiff(event) {
      setRecipeDiff(event.target.value);
   }

   // send create request to endpoint
   async function addRecipeToDatabase(event) {
      event.preventDefault(); // prevent page refresh on sign-up
      createRecipeObjectFromInputs();
      console.log(newRecipe); //new user details to send to endpoint

      ("https://replicake.onrender.com/recipes/create");
      ("/recipes/create");
      fetch("https://replicake.onrender.com/recipes/create", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newRecipe),
      })
         .then((response) => response.json()) // parse JSON response
         .then((data) => {
            console.log(`Returned value: ${data} from /users/signup`);
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });

      clearAllInputs();
      setShowModal(!showModal); // close modal
   }

   // create recipe helper functions
   function createRecipeObjectFromInputs() {
      newRecipe = {
         authorId: userId,
         title: title,
         recipeDifficulty: recipeDifficulty,
         favourites: 0, // favourited 0 times by default
         ingredients: ingredients,
         instructions: instructions,
         tags: tags,
      };
   }

   function clearAllInputs() {
      setTitle("");
      setIngredients([]);
      setInstructions([]);
      setTags([]);
   }

   const addRecipeModal = (
      <div ref={modalRef} className="add-recipe">
         <button className="close-btn-parent">
            <CloseIcon className="close-btn" onClick={handleAddButtonClick} fontSize="large" />
         </button>
         <form className="add-recipe-form">
            <Components.Title className="recipe-form-title">Create Recipe</Components.Title>
            {/* Input fields for recipe attributes */}
            <div className="inputs">
               <Components.Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={getTitle}
                  className="title-input"
               />
               <div className="slider-input">
                  <h6 className="text-muted">Difficulty</h6>
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
               <div className="multi-input">
                  <div className="ingredients">
                     <TagsInput
                        value={ingredients}
                        onChange={setIngredients}
                        name="ingredients"
                        placeHolder="Enter ingredients"
                     />
                  </div>
                  <div className="instructions">
                     <TagsInput
                        value={instructions}
                        onChange={setInstructions}
                        name="instructions"
                        placeHolder="Enter instructions"
                     />
                  </div>
                  <div className="tags">
                     <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Enter tags"
                     />
                  </div>
               </div>
            </div>

            <Components.Button className="btn-hover" onClick={addRecipeToDatabase}>
               Add to Cookbook
            </Components.Button>
         </form>
      </div>
   );

   return (
      <>
         <button className="add-btn" onClick={handleAddButtonClick}>
            <AddCircleIcon sx={{ fontSize: 40 }} className="add-btn-icon" />
            Add
         </button>
         {showModal && addRecipeModal}
      </>
   );
};

export default AddRecipe;
