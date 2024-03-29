import React from "react";
import { useState } from "react";
import "./styles/Searchbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ onSearch}) {
   const [value, setValue] = useState("");

   const onChange = (event) => {
      const searchTerm = event.target.value;
      setValue(searchTerm);
      onSearch(searchTerm); // Call the onSearch prop with the search term
      console.log("search", searchTerm);
   };


   return (
      <div className="searchbar-wrap">
         <div className="searchbar-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
         </div>
         <input type="text" placeholder="Search" value={value} onChange={onChange} />
         <button className="search-icon" onClick={() => onSearch(value)}>
            <FontAwesomeIcon icon={faArrowRight} size="2x" />
         </button>
      </div>
   );

   
}
