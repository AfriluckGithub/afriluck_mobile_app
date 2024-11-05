import React from "react";
import { AccountData } from "../../data/account";
import { NavLink } from "react-router-dom";

const Accounts = () => {
  return (
    <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl">
      {AccountData.map((account, index) => (
        <NavLink
          key={index}
          className="flex items-center justify-between py-4 "
          to={account.route}
        >
          <div className="flex items-center space-x-2">
            <img src={account.img} alt={account.title} className="w-6 h-6 " />
            <span className="font-normal text-md">{account.title}</span>
          </div>
          <img src={"chevronr.svg"} alt="" />
        </NavLink>
      ))}
    </div>
  );
};

export default Accounts;
