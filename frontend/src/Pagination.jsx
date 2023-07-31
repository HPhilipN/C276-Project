import React from "react";
import "./styles/Pagination.css";

// gets totalPosts, postsPerPage and currentPage from Cookbook.jsx
const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    //pass empty array that will be filled with page numbers 
    let pages = [];
    //math.ceil rounds to nearest greater integer
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        //set each page number starting from 1 
        pages.push(i);
    }
    return (
        //displays all page numbers 
        <div className="page-container">
            {pages.map((page, index)=> {
                    return <button className="page-button" key={index} onClick={()=> setCurrentPage(page)}>{page}</button>;
            })}
        </div>
    );
}
export default Pagination