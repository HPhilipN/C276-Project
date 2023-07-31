import React from "react";
import "./styles/Pagination.css";
import { returnPaginationRange } from "./PaginationRange";

// gets totalPosts, postsPerPage and currentPage from Cookbook.jsx
const Pagination = ({totalPosts, postsPerPage, setCurrentPage, props}) => {
    //pass empty array that will be filled with page numbers 
    //let array = returnPaginationRange(props.totalPage, props.currentPage, props.limit, props.siblings);
    let pages = [];
    let i;
    //math.ceil rounds to nearest greater integer
    for(i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        //set each page number starting from 1 
        pages.push(i);
    }
    let totalPage = pages[i];
    return (
        //displays all page numbers 
        <div className="page-container">
            <button className="page-button">First</button>
            <button className="page-button">Previous</button>
            {pages.map((page, index)=> {
                    return (
                        <span>
                        <button className="page-button" key={index} onClick={()=> setCurrentPage(page)}>{page}</button>
                        
                        </span>
                    );
                    
            })}
            <button className="page-button">Next</button>
            <button className="page-button">Last</button>
            
        </div>
    );
}
export default Pagination