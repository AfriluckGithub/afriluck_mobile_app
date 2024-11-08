import React from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full space-y-6   py-4">
      <div className="flex flex-row space-x-4 p-4 w-full  items-center bg-white rounded-xl">
        <div>
          <div
            style={{ backgroundColor: "#156064" }}
            className="flex h-12 w-12 text-center text-white rounded-full font-semibold justify-center items-center"
          >
            <p>N/A</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-lg font-semibold">Username</p>
          <p className="text-sm text-text-muted">0202020202</p>
        </div>
        <img
          src="edit.svg"
          alt="afriluck"
          className=""
          onClick={() => navigate("/profilescreen")}
        />
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex flex-col w-full items-center  bg-white rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <img src="credit.svg" alt="afriluck" className="w-6 h-6" />
            <p className="text-sm font-regular">Credit</p>
          </div>
          <p className="text-lg font-semibold">GHS 200.00</p>
          <Button
            label="Topup"
            className="bg-secondary text-primary w-full btn-sm"
          />
        </div>
        <div className="flex flex-col w-full items-center  bg-white rounded-xl p-4 space-y-2">
          <div className="flex  items-center space-x-2">
            <img src="wins.svg" alt="afriluck" className=" w-6 h-6" />
            <p className="text-sm font-regular">Wins Account</p>
          </div>
          <p className="text-lg font-semibold">GHS 200.00</p>
          <Button
            label="Withdraw"
            className="bg-primary text-white w-full btn-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
