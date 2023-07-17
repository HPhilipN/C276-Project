import React, {Component, useEffect, useState, useContext} from "react";
import Navbar from "./NavbarAdmin";
import Modal from "react-modal";
import { UserContext } from "./utils/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
    overlay: {
       background: "rgba(0, 0, 0, 0.5)",
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

export default function AdminUserlist (){
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const {
        signInStatus,
        setSignInStatus,
        isChef,
        setIsChef,
        isModerator,
        setIsModerator,
        nameValue,
        setNameValue,
        userId,
        setUserId,
     } = useContext(UserContext);

    //Display all users present in the database 
    useEffect(()=>{
        const getcategory = async ()=>{
            const res = await fetch("https://replicake.onrender.com/users/view");
            const getData = await res.json();
            //need to allow moderators/admin not to be shown (use isModerator?)
            setCategory(getData);
            console.log(getData);
        }
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
   
   
  async function deleteUser(uid){
    console.log(uid);
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
  
    
    return (
        <div>
            <Navbar/>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
            <button className="x-button" onClick={() => setModalOpen(false)}>
               <FontAwesomeIcon icon={faX} />
            </button>
            <div>
               {/*Category*/}
               Hello this is the view user modal
            </div>
            </Modal>
            <div>
                <table>
                    <thead>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <th>Username ID</th>
                            <th>Email</th>
                            <th>Manage</th>

                        </tr>
                        {

                        category.map((getcate)=>(
                            <tr key = {getcate.uid}>
                            <td> {getcate.name} #{getcate.uid} </td>
                            <td> {getcate.email} </td>
                            <td> <a className ="btn btn-success" onClick={setModalOpen}>View</a> </td>
                            <td> <a className = "btn btn-danger" onClick={ () => deleteUser(getcate.uid)}>Delete</a> </td>
                            </tr>
                        ))
                        }

                    </tbody>
                 
                </table>
            </div>
        </div>
    );
}

