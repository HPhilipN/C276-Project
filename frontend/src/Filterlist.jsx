import React, { useEffect, useState } from "react";
import categoryListJson from "./Filtercategories.json";
import "./styles/Filterlist.css";
import CategoryButton from "./CategoryButton";

export default function Filterlist() {
   const categoryList = Object.keys(categoryListJson)
   const itemList = categoryList.map((category) => (
    <div key={category}>
      <h4>{category}</h4>
      {categoryListJson[category].map((categoryItem) => (
        <CategoryButton text={categoryItem}/>
      ))}
    </div>
  ));
   return <div>{itemList}</div>;
}
