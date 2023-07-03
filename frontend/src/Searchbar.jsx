import { useState } from "react";
import "./Searchbar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Searchbar(){

    const [value, setValue] = useState('');

    //get value of textbox and put in state
    const onChange = (event) => {
        setValue(event.target.value);
    }

    const onSearch = (searchTerm) => {
        //api to fetch result??
        console.log('search', searchTerm);
    }
    return(
        <div class="Searchbar">
            <h1>Search</h1>
            <div class="search-container">
                <div class=" search-inner">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" placeholder="Search here" value={value} onChange={onChange}  />
                    <button onClick={()=>onSearch(value)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </div>
        </div>
    );
}