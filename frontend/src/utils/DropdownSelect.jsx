import React, { useState } from "react";
import "../styles/DropdownSelect.css";

const DropdownSelect = ({ setCuisineType }) => {
   const [selectedOption, setSelectedOption] = useState("");

   // Define Cuisine types
   const options = [
      "Chicken",
      "Vegetarian",
      "Sandwiches & Subs",
      "Desserts",
      "Wings",
      "Healthy",
      "Burgers",
      "Pizza",
      "Breakfast & Brunch",
      "Japanese",
      "Drinks",
      "Sushi",
      "Gluten Friendly",
      "Indian",
      "Vegan",
      "Chinese",
      "Barbecue",
      "Italian",
      "Pub Food",
      "Korean",
      "Fish & Chips",
      "Donair",
      "Bakery",
      "Vietnamese",
      "Thai",
      "Mexican",
      "Greek",
      "Middle Eastern",
      "Halal",
      "Cajun & Creole",
      "French",
      "Other",
   ];

   // Event handler to update the selected value
   const handleSelectChange = (event) => {
      setCuisineType(event.target.value);
      setSelectedOption(event.target.value); //for display purposes
   };

   return (
      <div className="dropdown-display">
         <h6 className="dropdown-title text-muted">Cuisine Type</h6>
         <select className="dropdown-main" value={selectedOption} onChange={handleSelectChange}>
            {options.map((option) => (
               <option key={option} value={option}>
                  {option}
               </option>
            ))}
         </select>
      </div>
   );
};

export default DropdownSelect;
