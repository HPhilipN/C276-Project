import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import "./Recipelist.css";

const RecipeList = () => {
    return (
        <div className="emptyrecipe">
            <FontAwesomeIcon icon={faKitchenSet} size="3x" />
            <h2>No Recipes have been added.</h2>
        </div>
    );
}

export default RecipeList;