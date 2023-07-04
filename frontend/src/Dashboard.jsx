import React from "react";
import Filter from "./filter";
import Searchbar from "./Searchbar";
import Recipelist from "./Recipelist";
import Navbar from "./NavbarLogin";
import "./styles/Dashboard.css";

const Dashboard = () => {
   return (
      <div className="dashboard">
         {/*Search bar*/}
         <Navbar />
         {/*Search bar*/}
         <Searchbar />
         {/*Filter Modal*/}
         <Filter />
         <div className="recipelist-wrap">
            {/*Recipe List*/}
            <Recipelist />
         </div>
      </div>
   );
};

export default Dashboard;
