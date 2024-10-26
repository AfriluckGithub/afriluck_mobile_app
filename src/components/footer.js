import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#F7F7F7] border-t border-gray-200">
      <div className="flex flex-row justify-around items-center py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm md:text-base ${
              isActive ? "text-[#156064] font-semibold" : "text-gray-600"
            } hover:text-[#156064]`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "home-active.svg" : "home.svg"}
                alt="Home"
                className="w-6 h-6 mb-1"
              />
              <span>Home</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/bet"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm md:text-base ${
              isActive ? "text-[#156064] font-semibold" : "text-gray-600"
            } hover:text-[#156064]`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "dice-active.svg" : "dice.svg"}
                alt="My Bets"
                className="w-6 h-6 mb-1"
              />
              <span>My Bets</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/draw"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm md:text-base ${
              isActive ? "text-[#156064] font-semibold" : "text-gray-600"
            } hover:text-[#156064]`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "draw-active.svg" : "draw.svg"}
                alt="Draw Results"
                className="w-6 h-6 mb-1"
              />
              <span>Draw Results</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm md:text-base ${
              isActive ? "text-[#156064] font-semibold" : "text-gray-600"
            } hover:text-[#156064]`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? "profile-active.svg" : "profile.svg"}
                alt="Profile"
                className="w-6 h-6 mb-1"
              />
              <span>Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
