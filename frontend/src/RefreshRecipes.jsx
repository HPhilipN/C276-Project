import React, { useContext } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./styles/AddRecipe.css";
import { RecipeContext } from "./utils/RecipeContext";

// User generated recipes
const RefreshRecipes = () => {
   const { setCalledAPI, setApiRecipes } = useContext(RecipeContext);

   function handleAddButtonClick() {
      // Clear the user's sign-in status and details from localStorage
      localStorage.removeItem("calledAPI");
      localStorage.removeItem("apiRecipes");
      // Reset the component's state
      setCalledAPI(false);
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
