import React, { useContext } from "react";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import NavbarLogin from "../NavbarLogin";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "./UserContext";
import "../styles/RecipeDisplay.css";

const Loader = () => {
   const { isChef, isModerator } = useContext(UserContext);

   return (
      <>
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="loader">
            <CircularProgress color="success" size={70} />
         </div>
      </>
   );
};

export default Loader;
