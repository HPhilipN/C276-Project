import React, { useEffect, useState } from "react";
import Navbar from "./NavbarAdmin";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faKitchenSet, faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles/AdminSearchBar.css";
import "./styles/AdminRecipelist.css";
import NoRecipesExist from "./NoRecipesExist";

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
   const [category, setCategory] = useState([]);
   const [message, setMessage] = useState("");
   const [recipeId, setRecipeId] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState(""); // State variable for search term

   // redirect to home if chef or logged out
   const navigate = useNavigate();

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
   }, []);

   // should redirect to full recipe view cookbook/view/rid
   function displayRecipe(rid) {
      console.log("in progress");
      navigate(`/cookbook/view/${rid}`);
   }

   //confirm delete via popup modal and pass rid to modal
   function confirmDelete(recipeId) {
      setRecipeId(recipeId);
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

   // Function to handle back button click
   const handleBack = () => {
      // Navigate back to the Adminhome page
      navigate("/admin/home");
   };

   // Create a function to handle search bar input change
   const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value);
   };

   // Filter the recipes based on the search term
   const filteredRecipes = category.filter((recipe) => {
      return (
         recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         recipe.authorName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
   });

   return (
      <>
         <Navbar />
         <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
            <button className="x-button" onClick={() => setModalOpen(false)}>
               <FontAwesomeIcon icon={faX} />
            </button>
            <div className="confirmdelbox">
               <p>Are you sure you want to delete this recipe?</p>
               <br />
               <button
                  className="confirmbtn"
                  onClick={() => {
                     deleteRecipe(recipeId);
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
         <div className="recipeboxes">
            {/* Center the search bar */}
            <div className="search-bar-container">
               <div className="searchbar-wraps">
                  <span className="searchbar-icons">
                     {/* You can add a search icon here if needed */}
                     <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                  </span>
                  {/* Add the search bar */}
                  <div className="search-bar">
                     <input
                        type="text"
                        placeholder="Search by author"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                     />
                  </div>
               </div>
            </div>
            {filteredRecipes.length > 0 ? (
               <>
                  <table className="recipedisplay">
                     <thead></thead>
                     <tbody>
                        <tr>
                           <th>Recipe</th>
                           <th>Author</th>
                           <th>Manage</th>
                        </tr>
                        {filteredRecipes.map((recipe) => (
                           <tr className="reciperow" key={recipe.rid}>
                              <td>
                                 <FontAwesomeIcon icon={faKitchenSet} /> {recipe.title} #
                                 {recipe.rid}
                              </td>
                              <td>
                                 <FontAwesomeIcon icon={faUser} /> {recipe.authorName}
                              </td>
                              <td>
                                 <button
                                    className="viewbtn btn-hover"
                                    onClick={() => displayRecipe(recipe.rid)}
                                 >
                                    View
                                 </button>
                              </td>
                              <td>
                                 <button
                                    className="deletebtn btn-hover"
                                    onClick={() => confirmDelete(recipe.rid)}
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </>
            ) : (
               <div className="no-recipes-found">
                  <h3>No Recipes with those parameters exist</h3>
               </div>
            )}
            <div className="back-btn-containers">
               {/* Back button */}
               <button className="back-btn btn-hover" onClick={handleBack}>
                  Back
               </button>
            </div>
         </div>
      </>
   );
}
