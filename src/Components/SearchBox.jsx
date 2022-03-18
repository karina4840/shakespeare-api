import React from "react";


 function SearchBox({ searchChange }) {

  return (
    <div className="input-container">
      <input
        className="input-box"
        type="search"
        placeholder="Search"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
