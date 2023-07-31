import React, { Component, useEffect, useState, useContext } from "react";
import Navbar from "./NavbarAdmin";
import Modal from "react-modal";
import { UserContext } from "./utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles/AdminRecipelist.css";
import { faMagnifyingGlass, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
   overlay: {
      background: "rgba(0, 0, 0, 0.1)",
      overflowY: "scroll",
      zIndex: 999,
   },
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "50%",
      maxHeight: 600,
   },
};

export default function AdminUserlist() {
   const { isModerator, userId } = useContext(UserContext);
   const [category, setCategory] = useState([]);
   const [errormodalOpen, seterrormodalOpen] = useState(false);
   const [deleteuser, setDeleteuser] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState(""); // State variable for search term

   // redirect to home if chef or logged out
   const navigate = useNavigate();
   if (!isModerator) {
      navigate("/");
   }

   // Display all users present in the database
   useEffect(() => {
      const getcategory = async () => {
         const res = await fetch("https://replicake.onrender.com/users/view");
         const getData = await res.json();

         // Filter users based on search term
         const filteredUsers = getData.filter(
            (user) =>
               user.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().startsWith(searchTerm.toLowerCase())||
               user.uid.toString().startsWith(searchTerm) // Search by ID
         );

         setCategory(filteredUsers);
      };
      getcategory();
   }, [searchTerm]); //Add searchTerm as a dependency to re-run the effect when it changes

      //Create a function to handle search bar input change
      const handleSearchInputChange = (event) => {
         setSearchTerm(event.target.value);
      };
   
   //confirm delete via popup modal and pass uid to modal
   function confirmDelete(deleteuser) {
      setDeleteuser(deleteuser);
      setModalOpen(true);
   }

   async function deleteUser(uid) {
      console.log(uid);
      if (uid == userId) {
         //Inform the admin that they cannot delete themselves
         console.log("You cannot delete yourself.");
         seterrormodalOpen(true);
      } else {
         fetch(`https://replicake.onrender.com/users/delete/${uid}`, {
            method: "DELETE",
         })
            .then((response) => response.json()) // parse JSON response
            .then((data) => {
               console.log(`Returned value: ${data} from /users/`);
            })
            .catch((error) => {
               console.log("===== ERROR =====");
               console.log(error);
            });
      }
   }
   // Function to handle back button click
  const handleBack = () => {
   // Navigate back to the Adminhome page
   navigate("/admin/home");
 };

 return (
   <div>
      <Navbar />
      <Modal
         isOpen={errormodalOpen}
         onRequestClose={() => seterrormodalOpen(false)}
         style={customStyles}
      >
         <button className="x-button" onClick={() => seterrormodalOpen(false)}>
            <FontAwesomeIcon icon={faX} />
         </button>
         <div>
            {/*Error when user tries to delete themselves*/}
            ERROR: You cannot delete yourself from the database.
         </div>
      </Modal>
      <div className="recipeboxes">
             {/* Center the search bar */}
             <div className="search-bar-container">
               <div className="searchbar-wrap">
                  <span className="searchbar-icon">
                     {/* You can add a search icon here if needed */}
                     <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                     </span>
         {/* Add the search bar */}
         <div className="search-bar">
            <input
               type="text"
               placeholder="Search by username/email/id"
               value={searchTerm}
               onChange={handleSearchInputChange}
            />
         </div>
         </div>
            </div>
         <table className="recipedisplay">
            <thead></thead>
            <tbody>
               <tr>
                  <th>Username ID</th>
                  <th>Email</th>
                  <th>Manage</th>
               </tr>
               {category.map((getcate) => (
                  <tr className="reciperow" key={getcate.uid}>
                     <td>
                     <FontAwesomeIcon icon={faUser} /> {getcate.name} #{getcate.uid}
                     </td>
                     <td> {getcate.email} </td>
                     <td>
                        <button
                           className="deletebtn  btn-hover"
                           onClick={() => confirmDelete(getcate.uid)}
                        >
                           Delete
                        </button>
                     </td>
                     <Modal
                        isOpen={modalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        style={customStyles}
                     >
                        <button className="x-button" onClick={() => setModalOpen(false)}>
                           <FontAwesomeIcon icon={faX} />
                        </button>
                        <div className="confirmdelbox">
                           <p>Are you sure you want to delete this user?</p>
                           <br />
                           <button
                              className="confirmbtn"
                              onClick={() => {
                                 deleteUser(deleteuser);
                                 setModalOpen(false);
                              }}
                           >
                              Yes
                           </button>
                           <button className="cancelbtn" onClick={() => setModalOpen(false)}>
                              Cancel
                           </button>
                        </div>
                     </Modal>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className="back-btn-container">
            {/* Back button */}
            <button className="back-btn" onClick={handleBack}>
               Back
            </button>
         </div>
      </div>
   </div>
);
}