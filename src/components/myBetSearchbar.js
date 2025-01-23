import React from "react";
import "../output.css";
import InputBorderless from "./inputBorderless";

const MyBetSearchBar = () => {
  return (
    <>
      <InputBorderless
        type={"text"}
        placeholder={"Search"}
        icon={"search.png"}
        className="bg-gray-200 input-md mt-28 ml-5 mr-5"
      />
    </>
  );
};

export default MyBetSearchBar;
