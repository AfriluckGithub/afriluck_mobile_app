import React from "react";
import "../output.css";
import InputBorderless from "../components/inputBorderless";

const SearchBar = ({ query, setQuery, className }) => {
  return (
    <>
      <InputBorderless
        type={"text"}
        placeholder={"Search"}
        icon={"search.png"}
        className={`bg-[#FAFAFA] input-md ${className} `}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
