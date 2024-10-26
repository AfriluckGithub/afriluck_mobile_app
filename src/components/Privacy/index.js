import React from "react";
import { PrivacyData } from "../../data/privacy";

const Privacy = () => {
  return (
    <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl">
      {PrivacyData.map((privacy, index) => (
        <div key={index} className="flex items-center justify-between py-4 ">
          <div className="flex items-center space-x-2">
            <img src={privacy.img} alt={privacy.title} className="w-6 h-6 " />
            <span className="font-normal text-md">{privacy.title}</span>
          </div>
          <img src={"chevronr.svg"} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Privacy;
