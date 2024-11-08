import React from "react";
import { useNavigate } from "react-router-dom";

const Notlogged = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row w-full justify-between px-4 py-4 bg-white rounded-xl">
      {" "}
      <button
        type="button"
        className=" w-full py-4 px-4 bg-[#156064] font-semibold text-white rounded-lg hover:bg-[#156064]"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Notlogged;
