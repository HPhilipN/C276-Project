import React, { Component, useEffect, useState, useContext } from "react";
import Navbar from "./NavbarAdmin";
import Modal from "react-modal";
import { UserContext } from "./utils/UserContext";
import "./styles/AdminRecipelist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

export default function AdminRecipelist() {
   const { isChef, userId } = useContext(UserContext);
   const [category, setCategory] = useState([]);
   const [message, setMessage] = useState("");
   const [recipeId, setRecipeId] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);

   const navigate = useNavigate();
   if (isChef) {
      navigate("/");
   }

   //Display all recipes present in the database
   useEffect(() => {
      const getcategory = async () => {
         const res = await fetch("https://replicake.onrender.com/recipes/view");
         const getData = await res.json();
         //need to allow moderators/admin not to be shown (use isModerator?)
         setCategory(getData);
         //  console.log(getData);
      };
      getcategory();
   });

   //confirm delete via popup modal and pass rid to modal 
   async function confirmDelete(recipeId) {
        setRecipeId(recipeId)
        setModalOpen(true);
   }
   
   //deletes recipe from the cookbook based on passed rid
   async function deleteRecipe(rid) {
      console.log(rid);
      fetch(`https://replicake.onrender.com/recipes/delete/${rid}`, {
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

   return (
      <div>
         <Navbar />
         <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
            <button className="x-button" onClick={() => setModalOpen(false)}>
            <FontAwesomeIcon icon={faX} />
            </button>
            <div className="confirmdelbox">
                <p>Are you sure you want to delete this recipe?</p><br />
                <button className="confirmbtn" onClick={() => {deleteRecipe(recipeId); setModalOpen(false)}}>Yes</button>
                <button className="cancelbtn" onClick={() => setModalOpen(false)}>Cancel</button>             
            </div>
        </Modal>
         <div className="recipebox">
            <table className="recipedisplay">
               <thead></thead>
               <tbody>
                  <tr>
                     <th>Recipe</th>
                     <th>Author</th>
                     <th>Favourites</th>
                     <th>Manage</th>
                  </tr>
                  {category.map((getcate) => (
                     <tr className="reciperow" key={getcate.rid}>
                        <td>
                           {" "}
                           <FontAwesomeIcon icon={faKitchenSet} /> {getcate.title} #{getcate.rid}{" "}
                        </td>
                        <td>
                           {" "}
                           <FontAwesomeIcon icon={faUser} /> {getcate.authorName}{" "}
                        </td>
                        <td>
                           {" "}
                           <FontAwesomeIcon icon={faStar} /> {getcate.favourites}{" "}
                        </td>
                        <td>
                           <button className="viewbtn" onClick={() => displayRecipe(getcate.rid)}>
                              View
                           </button>
                        </td>
                        <td>
                           {" "}
                           <button className="deletebtn" onClick={() => confirmDelete(getcate.rid)}>
                              Delete
                           </button>{" "}
                        </td>
                     </tr>
                     
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
