import React, { useEffect, useState } from "react";
import categoryListJson from "./Filtercategories.json";
import "./styles/Filterlist.css";
import CategoryButton from "./CategoryButton";
//this thing renders the filterlist
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
  // TODO add the functionality here and try to make it so that we can use it for other filters on the site
  
   return <div>{itemList}</div>;
}
