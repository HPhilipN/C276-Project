import React from "react";
import "./styles/Pagination.css";
import { returnPaginationRange } from "./PaginationRange";
import { useState } from "react";


// gets totalPosts, postsPerPage and currentPage from Cookbook.jsx
const Pagination = ({totalPosts, postsPerPage, setCurrentPage, props}) => {
    //pass empty array that will be filled with page numbers 
    //let array = returnPaginationRange(props.totalPage, props.currentPage, props.limit, props.siblings);
    let pages = [];
    const [nextpage, setNextPage] = useState(2);
    const [prevpage, setPrevPage] = useState(1);
    let i;
    //math.ceil rounds to nearest greater integer
    for(i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        //set each page number starting from 1 
        pages.push(i);
    }
    //set total number of pages available 
    let totalPage = i-1;

    //handles pressing next button to click to next page 
     function handleNext (currentPage){
        // if current page index does not exceed max 
        if(currentPage< totalPage){
            //set to next page 
            setNextPage(currentPage+1)
            console.log(totalPage);
            console.log(nextpage);
            console.log("Next button available");

        }else{
            setNextPage(currentPage);
            console.log("Next button unavailable - bounds exceeded");
            console.log(totalPage);
        }
     }

     //handles pressing previous button to click to previous page 
     function handlePrevious (currentPage){
        // if current page index is greater than 1 (first page)
        if(currentPage> 1){
            //set to previous page
            setPrevPage(currentPage-1)
            console.log(totalPage);
            console.log("Prev button available");

        }else{
            //do not switch page
            setPrevPage(currentPage);
            console.log("Prev button unavailable - bounds exceeded");
            console.log(totalPage);
        }
     }


    return (
        //displays all page indices and next, prev, first and last page
        <div className="page-container">
            <button className="extra-button" onClick={()=> {setCurrentPage(1), handleNext(1), handlePrevious(1)}}>First</button>
            <button className="extra-button" onClick={()=> {setCurrentPage(prevpage), handleNext(prevpage), handlePrevious(prevpage)}}>Previous</button>
            {pages.map((page, index)=> {
                    return (
                        <span>
                        <button className="page-button" key={index} onClick={()=> {setCurrentPage(page), handleNext(page), handlePrevious(page)}}>{page}</button>
                        </span>
                    );
                    
            })}
            <button className="extra-button" onClick={()=> {setCurrentPage(nextpage), handleNext(nextpage), handlePrevious(nextpage)}}>Next</button>
            <button className="extra-button" onClick={()=> {setCurrentPage(totalPage), handleNext(totalPage), handlePrevious(totalPage)}}>Last</button>
            
        </div>
    );
}
export default Pagination