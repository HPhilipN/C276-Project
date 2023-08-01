import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import SliderReplicake from "./utils/SliderReplicake"
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

function Filter({ filteredItems }) {
   const [modalOpen, setModalOpen] = useState(false);
   const [localPrepValue, setLocalPrepValue] = useState(165); // Local state for prepValue
   const [localCuisine, setLocalCuisine] = useState(""); // Local state for cuisine
 
   const handleSliderChange = (newValue) => {
     setLocalPrepValue(newValue); // Update the local state when the slider is interacted with
   };
 
   const handleCuisineChange = (selectedCuisine) => {
     setLocalCuisine(selectedCuisine); // Update the local state when the dropdown is interacted with
   };
 
   const apply = () => {
     setModalOpen(false);
     // Pass the local states back to the parent component when the "Apply" button is clicked
     filteredItems([localPrepValue, localCuisine]);
   };

   console.log(localPrepValue)
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
           <div className="category-group">
             <h1>Maximum prep time</h1>
             <SliderReplicake 
               value={localPrepValue}
               onChange={handleSliderChange} 
               gap={15}
               hasInfinite={true}
               finiteMarkCount={10}
            />
             <DropdownSelect cuisineValue={localCuisine} onChange={handleCuisineChange} />
             <button className="save-button" onClick={apply}>
               Apply
             </button>
           </div>
         </div>
       </Modal>
     </div>
   );
 }
 
 export default Filter;