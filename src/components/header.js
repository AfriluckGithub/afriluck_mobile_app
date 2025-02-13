import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../output.css";
import SearchBar from "./searchbar";
import { FaRegUser } from "react-icons/fa";
import Auth from "./Auth";

const Header = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Function to get the title based on the current route
  // const getTitle = () => {
  //   switch (location.pathname) {
  //     case "/":
  //       return "Home";
  //     case "/bet":
  //       return "My Bets";
  //     case "/draw":
  //       return "Draw Results";
  //     case "/profile":
  //       return "Profile";
  //     default:
  //       return "Home"; // Default title
  //   }
  // };

  // Function to determine which icon to display
  const getIcon = () => {
    switch (location.pathname) {
      case "/bet":
        return <img src="filter.svg" alt="Filter" className="w-6 h-6" />;
      case "/profile":
        return <img src="bell.png" alt="Notifications" className="w-6 h-6" />;
      default:
        return <img src="bell.png" alt="Notifications" className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex px-16 xl:flex flex-row justify-between items-center w-full h-auto bg-bg-white xl:px-48 fixed py-6  top-0 left-0 right-0 z-50">
      <img src="afriluck.svg" alt="Logo" className="w-24 h-auto ml-6" />
      {/* Conditionally render the KF div */}
      {location.pathname !== "/profile" && (
        <SearchBar
          query={query}
          setQuery={setQuery}
          className={"w-[45%] xl:w-[40%]"}
        />
      )}

      <div className="flex  items-center space-x-4">
        <Link to={"/profile"}>
          {location.pathname !== "/profile" ? (
            <div className="ml-6">
              <div
                style={{ backgroundColor: "#14B1B9" }}
                className="flex flex-wrap w-12 h-12 border-border-primary border-4 text-center text-white rounded-full font-semibold justify-center items-center"
              >
                <FaRegUser size={18} />
                {/* <p className="flex justify-center items-center p-3">KF</p> */}
              </div>
            </div>
          ) : (
            <div className="flex">
              <Auth />
            </div>
          )}
        </Link>
        {/* <div className="flex flex-wrap w-full text-center font-medium text-xl justify-center items-center">
        <p>{getTitle()}</p>
      </div> */}
        <div className="flex flex-wrap w-auto justify-center items-center mr-6">
          <p className="flex flex-wrap w-12 h-12 justify-center items-center border-border-default border rounded-xl bg-bg-tertiary">
            {getIcon()}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Header;
