import React, { useEffect, useState } from "react";
import "./styles/CategoryButton.css";

export default function CategoryButton({text}) {
    const [filterIndex, setFilterIndex] = useState(0);
    
    const toggleFilter = () => {
        setFilterIndex((filterIndex + 1) % 3);
    };
    const filters = ["", "include", "exclude"];
    return (
        <button
            onClick={toggleFilter}
            key={text}
            className={`category-button ${filters[filterIndex]}`}
        >{text}</button>
    )
}