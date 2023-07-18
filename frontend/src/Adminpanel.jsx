import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

export default function Adminhome(){
    return (
        <div>
            <div>
                <NavbarAdmin/>
            </div>
            <div>
                <a href="/adminusers">
                    <button className="secondary-button">
                        Manage Users
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </a>
                <a href="/adminrecipes">
                    <button className="secondary-button">
                        Manage Recipes
                        <FontAwesomeIcon icon={faKitchenSet} />
                    </button>
                </a>
            </div>
        </div>
    );
}