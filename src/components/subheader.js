import React from "react";
import { useNavigate } from "react-router-dom";
const Subheader = ({ title = "Default" }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center items-center w-full h-auto bg-[#F7F7F7] fixed py-8  top-0 left-0 right-0 z-50">
      <div className="flex flex-row w-full justify-between items-center mx-6">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={"chevronl.svg"} alt="" />
        </div>
        <h1 className="w-full text-xl font-medium text-center">{title}</h1>
      </div>
    </div>
  );
};

export default Subheader;
