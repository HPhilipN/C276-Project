import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SliderTen from "./utils/SliderTen"
import DropdownSelect from "./utils/DropdownSelect";

import "./styles/Filter.css";

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
   //t
   const [selectedFilters, setSelectedFilters] = useState([]);
   const [filteredItems, setFilteredItems] = useState(recipeData);

   //not sure if this works, just going off the guide atm
   const handleFilterlogic = (categoryList) => {
      if(selectedFilters.includes(categoryList)){
         let filters = selectedFilters.filter((el) => el !== categoryList);
         setSelectedFilters(filters);
      }
   };

   useEffect(() => {
      setFilteredItems(recipeData);
   }, [recipeData]);
   
   const apply = () => {
      setModalOpen(false);
   }
   const items = [
      // Array of items
   ];

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
                  <SliderTen/>
                  <DropdownSelect/>
                  <button className="save-button" onClick={() => apply()}>Apply</button>
               </div>
            </div>
         </Modal>
      </div>
   );

}

export default Filter;
