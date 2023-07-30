import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
// import Filterlist from "./Filterlist";
import Slider from '@mui/material/Slider';

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

function Filter({userRecipes}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleFilterLogic = (categoryList) => {
    if (selectedFilters.includes(categoryList)) {
      let filters = selectedFilters.filter((el) => el !== categoryList);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, categoryList]);
    }
  };

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredItems(userRecipes); // No filters selected, show all recipes
    } else {
      const filtered = userRecipes.filter((recipe) =>
        recipe.tags.some((tag) => selectedFilters.includes(tag))
      );
      setFilteredItems(filtered);
    }
  }, [selectedFilters, userRecipes]);

  const handleApplyBtn = () => {
    setModalOpen(false);
  };

//   useEffect(() => {
//     const filtered = filteredItems.filter((recipe) =>
//       recipe.tags.some((tag) => selectedFilters.includes(tag))
//     );
//     setFilteredItems(filtered);
//   }, [modalOpen]);

  return (
    <div className="Filter">
      <button className="filter-button" onClick={() => setModalOpen(true)}>
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
            <h1>Difficulty</h1>
            <Slider 
               aria-label="Difficulty"
               defaultValue={5}
               min={1}
               max={10}
               valueLabelDisplay="on"
            />
            
            {/* <h1>Filters</h1> */}
            {/* <Filterlist handleFilter={handleFilterLogic} /> */}
            <button className="control-button">Reset</button>
            <button className="save-button" onClick={handleApplyBtn}>
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Filter;
