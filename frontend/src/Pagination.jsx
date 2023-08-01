import React from "react";
import "./styles/Pagination.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
   let pages = [];
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pages.push(i);
   }
   let totalPage = pages.length;

   // Function to get the range of page numbers to display
   function getPageRange(currentPage, totalPage) {
      const range = [];

      // Always show the first page
      range.push(1);

      // Check if there should be an ellipsis after the first page
      if (currentPage > 3) {
         range.push("...");
      }

      // Show the current page and its neighbors (2 pages before and 2 pages after)
      for (
         let i = Math.max(2, currentPage - 2);
         i <= Math.min(currentPage + 2, totalPage - 1);
         i++
      ) {
         range.push(i);
      }

      // Check if there should be an ellipsis before the last page
      if (currentPage < totalPage - 2) {
         range.push("...");
      }

      // Always show the last page
      range.push(totalPage);

      return range;
   }

   return (
      <div className="page-container">
         <button
            className="extra-button"
            onClick={() => {
               setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
         >
            <ArrowBackIcon sx={{ fontSize: 35 }} />
         </button>
         {getPageRange(currentPage, totalPage).map((page, index) => {
            return (
               <React.Fragment key={index}>
                  {page === "..." ? (
                     <span className="ellipsis">
                        <MoreHorizIcon sx={{ fontSize: 30 }} />
                     </span>
                  ) : (
                     <button
                        className={`page-button ${page === currentPage ? "active" : ""}`}
                        onClick={() => {
                           setCurrentPage(page);
                        }}
                     >
                        {page}
                     </button>
                  )}
               </React.Fragment>
            );
         })}
         <button
            className="extra-button"
            onClick={() => {
               setCurrentPage((prev) => Math.min(prev + 1, totalPage));
            }}
         >
            <ArrowForwardIcon sx={{ fontSize: 35 }} />
         </button>
      </div>
   );
};

export default Pagination;
