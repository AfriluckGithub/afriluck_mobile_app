import React from "react";
import { PolicyData } from "../../data/policy";
import Subheader from "../subheader";

const Policy = () => {
  return (
    <div className="flex flex-col w-full h-screen  bg-[#F7F7F7] p-6">
      <Subheader title="Privacy Policy" />
      {PolicyData.map((policy, index) => (
        <div key={index} className="w-full bg-white rounded-xl p-6 my-20">
          <p>{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Policy;
