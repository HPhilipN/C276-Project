import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Filterlist from "./Filterlist";

import "./styles/Filter.css";
import CategoryButton from "./CategoryButton";

const customStyles = {
   overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      overflowY: "scroll",
      zIndex: 999,
   },
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "50%", 
      maxHeight: 600,
   },
};
//handles the modal functionality for the filters
function Filter({recipeData}) {
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedFilters, setSelectedFilters] = useState([]);
   const [filteredItems, setFilteredItems] = useState(recipeData);

   const handleFilterlogic = (categoryList) => {
      if(selectedFilters.includes(categoryList)){
         let filters = selectedFilters.filter((el) => el !== categoryList);
         setSelectedFilters(filters);
      }
   };

   return (
      <div className="Filter">
         <button className="filter-button" onClick={setModalOpen}>
            <div className="filter-icon">
               <FontAwesomeIcon icon={faFilter} />
               Filters
            </div>
         </button>
         <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
            <button className="x-button" onClick={() => setModalOpen(false)}>
               <FontAwesomeIcon icon={faX} />
            </button>
            <div>
               {/*Category*/}
               <div className="category-group">
                  <h1>Filters</h1>
                  <Filterlist /> 
                  <button className="control-button">Reset</button>
                  <button className="save-button">Apply</button>
               </div>
            </div>
         </Modal>
      </div>
   );

}

export default Filter;
