import React, {useEffect, useState} from "react";
import { categoryList } from "./Filtercategories";
import "./Filterlist.css";

export default function Filterlist(){
    const itemList = categoryList.map((item)=> (
            <div className="row">
                <h4>{item.category}</h4>
                <button className="category-button">{item.difficulty}{item.type}</button>
            </div>
    ));
    return(
        <div>
            {itemList}
        </div>
    );
}