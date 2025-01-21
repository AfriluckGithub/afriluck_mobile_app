import React from 'react';
import '../output.css';
import InputBorderless from "../components/inputBorderless";

const SearchBar = () => {
    return (
        <>
        <InputBorderless
                type={"number"}
                placeholder={"Search"}
                icon={"search.png"}
                className="bg-gray-200 input-md mt-28 ml-5 mr-5"
              />
        </>
    );
};

export default SearchBar;