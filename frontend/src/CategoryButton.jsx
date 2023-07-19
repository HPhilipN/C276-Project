import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "./styles/CategoryButton.css";


export default function CategoryButton({ text, handleFilter }) {
  const [filterIndex, setFilterIndex] = useState(0);

  const toggleFilter = () => {
    // change to 3 later; 3 has exclude
    setFilterIndex((filterIndex + 1) % 2);
    handleFilter(text);
  };

  const filterIcons = [null, faPlus, faMinus];
  const filters = ["", "include", "exclude"];
  return (
    <button
      onClick={toggleFilter}
      key={text}
      className={`category-button ${filters[filterIndex]}`}
    >
      {filterIcons[filterIndex] && <FontAwesomeIcon icon={filterIcons[filterIndex]} />}
      {text}
    </button>
  );
}
