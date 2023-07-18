import React, { Component, useEffect, useState, useContext } from "react";
import Navbar from "./NavbarAdmin";
import Modal from "react-modal";
import { UserContext } from "./utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./styles/AdminRecipelist.css";

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
   const { isChef, userId } = useContext(UserContext);
   const [category, setCategory] = useState([]);
   const [errormodalOpen, seterrormodalOpen] = useState(false);
   const [deleteuser, setDeleteuser] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   const navigate = useNavigate();
   if (isChef) {
      navigate("/");
   }

   //Display all users present in the database
   useEffect(() => {
      const getcategory = async () => {
         const res = await fetch("https://replicake.onrender.com/users/view");
         const getData = await res.json();
         //need to allow moderators/admin not to be shown (use isModerator?)
         setCategory(getData);
         //  console.log(getData);
      };
      getcategory();
   });

   //Delete user from database with UID passed in
   /*
   const deleteUser= async (uid) => {
        console.log(uid);
        setUserId(uid);
        console.log(userId);
        const  requestDelete= await fetch(`https://replicake.onrender.com/users/delete/${uid}`);
        const deleteResponse = requestDelete.json();
        setMessage(deleteResponse);
   }
   */

    //confirm delete via popup modal and pass uid to modal 
    async function confirmDelete(deleteuser) {
        setDeleteuser(deleteuser)
        setModalOpen(true);
   }
   

   async function deleteUser(uid) {
      console.log(uid);
      if (uid == userId) {
         //Inform the admin that they cannot delete themselves
         console.log("You cannot delete yourself.")
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

   return (
      <div>
         <Navbar />
         <Modal isOpen={errormodalOpen} onRequestClose={() => seterrormodalOpen(false)} style={customStyles}>
            <button className="x-button" onClick={() => seterrormodalOpen(false)}>
               <FontAwesomeIcon icon={faX} />
            </button>
            <div>
               {/*Error when user tries to delete themselves*/}
               ERROR: You cannot delete yourself from the database.
            </div>
         </Modal>
         <div className="recipebox">
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
                           {" "}
                           {getcate.name} #{getcate.uid}{" "}
                        </td>
                        <td> {getcate.email} </td>
                        <td>
                           {" "}
                           <button className="viewbtn">View</button>{" "}
                        </td>
                        <td>
                           {" "}
                           <button className="deletebtn" onClick={() => confirmDelete(getcate.uid)}>
                              Delete
                           </button>{" "}
                        </td>
                        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
                            <button className="x-button" onClick={() => setModalOpen(false)}>
                            <FontAwesomeIcon icon={faX} />
                            </button>
                            <div className="confirmdelbox">
                                <p>Are you sure you want to delete this user?</p><br />
                                <button className="confirmbtn" onClick={() => {deleteUser(deleteuser); setModalOpen(false)}}>Yes</button>
                                <button className="cancelbtn" onClick={() => setModalOpen(false)}>Cancel</button>
                                
                            </div>
                        </Modal>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
