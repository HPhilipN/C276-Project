import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "./styles/CategoryButton.css";

export default function CategoryButton({ text }) {
  const [filterIndex, setFilterIndex] = useState(0);

  const toggleFilter = () => {
    setFilterIndex((filterIndex + 1) % 3);
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
