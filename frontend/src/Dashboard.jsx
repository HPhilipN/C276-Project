import React from "react";
import Filter from "./filter";
import Searchbar from "./Searchbar";
import Recipelist from "./Recipelist";
import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div class="dashboard">
            {/*Search bar*/}
            <Navbar/>
            {/*Search bar*/}
            <Searchbar />
            {/*Filter Modal*/}
            <Filter/>
            <div class= "recipelist-wrap">
                {/*Recipe List*/}
                <Recipelist/>
            </div>
            
            

        </div>
    )
}

export default Dashboard