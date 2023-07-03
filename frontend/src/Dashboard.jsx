import React from "react";
import Filter from "./filter";
import Searchbar from "./Searchbar";
import Recipelist from "./Recipelist";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div class="dashboard">
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