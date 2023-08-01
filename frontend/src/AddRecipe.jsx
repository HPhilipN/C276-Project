import React, { useState, useContext, useRef, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as Components from "./utils/Components";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import DropdownSelect from "./utils/DropdownSelect";
import { UserContext } from "./utils/UserContext";
import { capitalizeEveryWord } from "./utils/utils";
import { TagsInput } from "react-tag-input-component";
import "./styles/AddRecipe.css";

// User generated recipes
const AddRecipe = ({ setUserRecipes }) => {
   const { userId } = useContext(UserContext);
   const [title, setTitle] = useState(""); // string
   const [recipeDifficulty, setRecipeDiff] = useState(5); // int
   const [ingredients, setIngredients] = useState([]); // array
   const [instructions, setInstructions] = useState([]); // array
   const [tags, setTags] = useState([]); // array
   const [cuisineType, setCuisineType] = useState("");
   const [prepTime, setPrepTime] = useState();
   const [submitDisabled, setSubmitDisabled] = useState(false);
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
   function getPrepTime(event) {
      let value = event.target.value;
      if (/^[0-9]{0,3}$/.test(value) && Number(value) <= 999) {
         // Check if the value is a positive integer from 0 to 999
         console.log(`setPrepTime: ${value}`);
         setPrepTime(value);
      } else {
         console.log("Invalid Prep Time");
         return;
      }
   }

   // send create request to endpoint
   async function addRecipeToDatabase(event) {
      // event.preventDefault(); // prevent page refresh on sign-up

      // Create a new array with cuisineType added
      const updatedTags = [...tags, cuisineType];
      createRecipeObjectFromInputs(updatedTags);
      console.log(newRecipe); //new user details to send to endpoint

      // "https://replicake.onrender.com/recipes/create"
      // "/recipes/create"
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
            setUserRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // Update the userRecipes state with the new recipe
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });

      clearAllInputs();
      setShowModal(!showModal); // close modal
   }

   // create recipe helper functions
   function createRecipeObjectFromInputs(updatedTags) {
      newRecipe = {
         authorId: userId,
         title: title,
         recipeDifficulty: recipeDifficulty,
         prepTime: prepTime,
         ingredients: ingredients,
         instructions: instructions,
         tags: updatedTags,
      };
   }

   function clearAllInputs() {
      setTitle("");
      setIngredients([]);
      setInstructions([]);
      setTags([]);
      setPrepTime();
   }

   // disable submit if all inputs arent filled
   useEffect(() => {
      if (
         title.length <= 0 ||
         ingredients.length <= 0 ||
         instructions.length <= 0 ||
         tags.length <= 0 ||
         prepTime <= 0 ||
         prepTime > 999
      ) {
         setSubmitDisabled(true);
      } else {
         setSubmitDisabled(false);
      }
   }, [title, ingredients, instructions, tags, prepTime]);

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
               <Components.Input
                  type="number"
                  placeholder="Preparation Time in Minutes"
                  value={prepTime}
                  onChange={getPrepTime}
                  className="preptime-input"
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
               <div className="cusine-dropdown">
                  <DropdownSelect setCuisineType={setCuisineType} />
               </div>
               <div className="multi-input">
                  <div className="ingredientsInput">
                     <TagsInput
                        value={ingredients}
                        onChange={setIngredients}
                        name="ingredients"
                        placeHolder="Enter ingredients"
                     />
                  </div>
                  <div className="instructionsInputs">
                     <TagsInput
                        value={instructions}
                        onChange={setInstructions}
                        name="instructions"
                        placeHolder="Enter instructions"
                     />
                  </div>
                  <div className="tagsInput">
                     <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Enter up to 6 tags"
                        beforeAddValidate={(tag, existingTags) => {
                           console.log(tags);
                           if (existingTags.length >= 5) {
                              return false;
                           }
                           return true;
                        }}
                     />
                  </div>
               </div>
            </div>

            <Components.Button
               className={submitDisabled ? "btn-disabled" : "btn-hover"}
               disabled={submitDisabled}
               onClick={addRecipeToDatabase}
            >
               Add to Cookbook
            </Components.Button>
         </form>
      </div>
   );

   return (
      <>
         <button className="add-btn" onClick={handleAddButtonClick}>
            <AddCircleOutlineIcon sx={{ fontSize: 40 }} className="add-btn-icon" />
            Add
         </button>
         {showModal && addRecipeModal}
      </>
   );
};

export default AddRecipe;
