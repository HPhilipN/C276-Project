import React from "react";

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
        <div>
            {pages.map((page, index)=> {
                    return <button key={index} onClick={()=> setCurrentPage(page)}>{page}</button>;
            })}
        </div>
    );
}
export default Pagination