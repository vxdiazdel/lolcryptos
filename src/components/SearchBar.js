import React from "react";

const SearchBar = ({ onTextChange, searchText}) => ( 
    <div className="search-bar">
        <h3>Check Your Crypto Gains Here</h3> 
        <input 
            className="search-bar__input"
            type="text"
            placeholder="DOGE..."
            onChange={onTextChange}
            value={searchText}
        /> 
    </div>
);

export default SearchBar;