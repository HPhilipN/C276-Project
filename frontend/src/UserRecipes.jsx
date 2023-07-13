import React, { useContext } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import Recipelist from "./Recipelist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Dashboard.css";
import { UserContext } from "./UserContext";

const UserRecipes = () => {
   const { signInStatus, isChef, isModerator } = useContext(UserContext);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {signInStatus && isChef && <NavbarLogin />}
         {signInStatus && isModerator && <NavbarAdmin />}
         {!signInStatus && <Navbar />}
         <div className="filter-search-wrapper">
            {/*Search bar*/}
            {/*Filter Modal*/}
            <Filter />
            <Searchbar />
         </div>
         <div className="recipelist-wrap">
            {/*Recipe List*/}
            <Recipelist />
         </div>
      </div>
   );
};

export default UserRecipes;
