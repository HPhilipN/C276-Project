import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import "./styles/Recipelist.css";

const NoRecipesExist = () => {
   return (
      <div className="emptyrecipe">
         <FontAwesomeIcon icon={faKitchenSet} size="3x" />
         <h2>No Recipes have been added.</h2>
      </div>
   );
};

export default NoRecipesExist;
