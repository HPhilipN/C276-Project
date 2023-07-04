import React, { useEffect, useState } from "react";
import "./styles/CategoryButton.css";

export default function CategoryButton({text}) {
    return (
        <button key={text} className="category-button">
            {text}
        </button>
    )
}