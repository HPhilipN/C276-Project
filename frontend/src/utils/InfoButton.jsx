// Infobutton.jsx, click to show info on how recipes are displayed
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import "../styles/InfoButton.css";

// User generated recipes
const InfoButton = ({ InfoImg }) => {
   const [showModal, setShowModal] = useState(false);
   const modalRef = useRef(null);
   // if click outside modal, close modal
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   function handleInfoButtonClick(event) {
      event.preventDefault(); // prevent page refresh
      setShowModal(!showModal);
      console.log("Add Info Button clicked");
   }

   const infoModal = (
      <div ref={modalRef} className="info-modal">
         <button className="close-btn-parent">
            <CloseIcon className="close-btn" onClick={handleInfoButtonClick} fontSize="large" />
         </button>
         <img src={InfoImg} />
      </div>
   );

   return (
      <div>
         <button className="info-btn" onClick={handleInfoButtonClick}>
            <InfoIcon sx={{ fontSize: 60 }} className="info-btn-icon" />
         </button>
         {/* {infoModal} */}
         {showModal && infoModal}
      </div>
   );
};

export default InfoButton;
