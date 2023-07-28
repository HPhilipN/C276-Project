import React, { useContext } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./styles/AddRecipe.css";
import { RecipeContext } from "./utils/RecipeContext";

// User generated recipes
const RefreshRecipes = () => {
   const { setApiRecipes } = useContext(RecipeContext);

   function handleAddButtonClick() {
      // Reset the component's state
      setApiRecipes([]);
      console.log("Refresh Button Clicked");
   }

   return (
      <>
         <button className="add-btn" onClick={handleAddButtonClick}>
            <RefreshIcon sx={{ fontSize: 40 }} className="add-btn-icon" />
            Refresh
         </button>
      </>
   );
};

export default RefreshRecipes;
