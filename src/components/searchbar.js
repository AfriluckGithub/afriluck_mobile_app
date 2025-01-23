import React from "react";
import "../output.css";
import InputBorderless from "../components/inputBorderless";

const SearchBar = ({ 
    query, 
    setQuery }) => {
  return (
    <>
      <InputBorderless
        type={"text"}
        placeholder={"Search"}
        icon={"search.png"}
        className="bg-gray-200 input-md mt-28 ml-5 mr-5"
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
