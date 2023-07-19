import React, { useContext, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/Adminpanel.css";

export default function Adminhome() {
   const { isModerator, isChef } = useContext(UserContext);
   // redirect to home if chef or logged out
   const navigate = useNavigate();
   if (!isModerator) {
      navigate("/");
   }

   return (
      <div>
         <div>
            <NavbarAdmin />
         </div>
         <div className="innercontent">
            <h1>Admin Panel</h1>
            <p>Management of users and user-created recipes</p>
            <a href="/admin/users">
               <button className="secondary-button">
                  Manage Users
                  <FontAwesomeIcon icon={faUser} />
               </button>
            </a>
            <a href="/admin/recipes">
               <button className="primary-button">
                  Manage Recipes
                  <FontAwesomeIcon icon={faCookieBite} size="lg" />
               </button>
            </a>
         </div>
      </div>
   );
}
