import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo-625px.png";
import "./styles/NotFound.css";

export default function NotFound() {
   return (
      <div className="background-green">
         <div className="notfound-main">
            <img className="replicakeLogo" src={Logo} alt="Replicake Logo" width={450}></img>
            <header className="title">The page you're looking for does not exist</header>
            <ul className="links">
               <li>
                  <Link className="button" to="/">
                     Home
                  </Link>
               </li>
               <li>
                  <Link className="button" to="/recipes">
                     Recipes
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}
