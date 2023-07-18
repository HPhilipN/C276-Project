import React, { useContext } from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import NoRecipesExist from "./NoRecipesExist";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";

// User generated recipes
const Recipes = () => {
   const { isChef, isModerator } = useContext(UserContext);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            {/*Filter Modal*/}
            <Filter />
            {/*Search bar*/}
            <Searchbar />
         </div>
         <div className="recipelist-wrap">
            {/*Recipe List*/}
            <NoRecipesExist />
            <div>
               <h4>TEMPORARY TEXT</h4>
               <p>This is where API recipes will be displayed</p>
            </div>
         </div>
      </div>
   );
};

export default Recipes;
