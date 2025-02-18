import React from "react";
import { PrivacyData } from "../../data/privacy";
import { NavLink, Outlet } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
      {PrivacyData.map((privacy, index) => (
        <NavLink
          key={index}
          className="flex items-center justify-between py-4 "
          to={privacy.route}
        >
          <div className="flex items-center space-x-2">
            <img src={privacy.img} alt={privacy.title} className="w-6 h-6 " />
            <span className="font-normal text-md">{privacy.title}</span>
          </div>
          <img src={"chevronr.svg"} alt="" />
        </NavLink>
      ))}
      <Outlet />
    </div>
  );
};

export default Privacy;
