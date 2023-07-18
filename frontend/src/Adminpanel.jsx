import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import "./styles/Adminpanel.css";

export default function Adminhome(){
    return (
        <div>
            <div>
                <NavbarAdmin/>
            </div>
            <div class="innercontent">
                <h1>Admin Panel</h1>
                <p>Management of users and user-created recipes</p>
                <a href="/adminusers">
                    
                    <button className="secondary-button">
                        Manage Users
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </a>
                <a href="/adminrecipes">
                    <button className="primary-button">
                        Manage Recipes
                        <FontAwesomeIcon icon={faCookieBite} size="lg" />
                    </button>
                </a>
            </div>
        </div>
    );
}