import React from "react";
import "./styles/Pagination.css";
import { returnPaginationRange } from "./PaginationRange";
import { useState } from "react";


// gets totalPosts, postsPerPage and currentPage from Cookbook.jsx
const Pagination = ({totalPosts, postsPerPage, setCurrentPage, props}) => {
    //pass empty array that will be filled with page numbers 
    //let array = returnPaginationRange(props.totalPage, props.currentPage, props.limit, props.siblings);
    let pages = [];
    const [nextpage, setNextPage] = useState();
    const [prevpage, setPrevPage] = useState();
    let i;
    //math.ceil rounds to nearest greater integer
    for(i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        //set each page number starting from 1 
        pages.push(i);
    }
    //set upper bound on total number of pages
    let totalPage = i-1;

    async function handleClick(page){
        setCurrentPage(page);
    }

    //handles pressing next button to click to next page 
     function handleNext (currentPage){
        // if current page index does not exceed max 
        if(currentPage< totalPage){
            //set to next page 
            setNextPage(currentPage+1)
            console.log(totalPage);
            console.log("set up next page successfully");

        }else{
            setNextPage(currentPage);
            console.log("exceeded page index");
            console.log(totalPage);
        }
     }

     //handles pressing previous button to click to previous page 
     function handlePrevious (currentPage){
        // if current page index is not less than 1
        if(currentPage> 1){
            //set to next page 
            setPrevPage(currentPage-1)
            console.log(totalPage);
            console.log("set up previous page successfully");

        }else{
            setPrevPage(currentPage);
            console.log("exceeded min page index");
            console.log(totalPage);
        }
     }


    return (
        //displays all page numbers 
        <div className="page-container">
            <button className="page-button">First</button>
            <button className="extra-button" onClick={()=> {setCurrentPage(prevpage), handleNext(prevpage), handlePrevious(prevpage)}}>Previous</button>
            {pages.map((page, index)=> {
                    return (
                        <span>
                        <button className="page-button" key={index} onClick={()=> {setCurrentPage(page), handleNext(page), handlePrevious(page)}}>{page}</button>
                        </span>
                    );
                    
            })}
            <button className="extra-button" onClick={()=> {setCurrentPage(nextpage), handleNext(nextpage), handlePrevious(nextpage)}}>Next</button>
            <button className="page-button">Last</button>
            
        </div>
    );
}
export default Pagination