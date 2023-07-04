import React from "react";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import Recipelist from "./Recipelist";
import Navbar from "./Navbar";
import "./styles/Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            {/*Search bar*/}
            <Navbar/>
            <div className="filter-search-wrapper">
                {/*Search bar*/}
                {/*Filter Modal*/}
                <Filter/>
                <Searchbar />
            </div>
            <div className= "recipelist-wrap">
                {/*Recipe List*/}
                <Recipelist/>
            </div>
            
        </div>
    )
}

export default Dashboard