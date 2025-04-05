import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Subheader = ({ title = "Default", image, onIconClick }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center items-center w-full h-auto bg-white border-b border-border-default px-4 md:px-12 lg:px-48 fixed py-6    top-0 left-0 right-0 z-50">
      <div className="flex flex-row w-full justify-between items-center mx-6">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="flex cursor-pointer  items-center ml-2 space-x-2 p-3 border-border-default border rounded-xl bg-bg-tertiary"
        >
          <BsArrowLeft size={24} />
          <h1 className="w-full text-xl font-medium text-center">{title}</h1>
        </div>
        <div onClick={onIconClick}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Subheader;
