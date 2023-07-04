import React, { useEffect, useState } from "react";
import categoryListJson from "./Filtercategories.json";
import "./styles/Filterlist.css";

export default function Filterlist() {
   // const itemList = categoryList.map((item) => (
   //    <div className="row">
   //       <h4>{item.category}</h4>
   //       <button className="category-button">
   //          {item.difficulty}
   //          {item.type}
   //          {item.occasion}
   //       </button>
   //    </div>
   // ));
   const categoryList = Object.keys(categoryListJson)
   const itemList = categoryList.map((category) => (
    <div key={category}>
      <h4>{category}</h4>
      {categoryListJson[category].map((categoryItem) => (
        <button key={categoryItem} className="category-button">
          {categoryItem}
        </button>
      ))}
    </div>
  ));
   return <div>{itemList}</div>;
}
