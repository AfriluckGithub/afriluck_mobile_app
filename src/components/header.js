import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./searchbar";
import "../output.css";
import { useSelector } from "react-redux";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

 
  useEffect(() => {
    const getBanalce = async () => {
      const response = await fetch(
        "https://app.afriluck.com/api/V1/app/account/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${memoizedUser.token}`,
          },
        }
      );
      const json = await response.json();
  
      if (response.status === 200) {
         setBalance(json.balance);
      }else{
         setBalance(0.0);
      }
    };
    getBanalce();
   }, [memoizedUser]);
  

  const getIcon = () => {
    return location.pathname === "/bet" ? (
      <img src="filter.svg" alt="Filter" className="w-6 h-6" />
    ) : (
      <img src="bell.png" alt="Notifications" className="w-6 h-6" />
    );
  };

  return (
    <div className="flex px-4 md:px-6 xl:flex flex-row justify-between items-center w-full h-auto bg-white xl:px-48 fixed py-6 top-0 left-0 right-0 z-50 border-b border-border-primary">
      {/* Logo */}
      <img src="afriluck.svg" alt="Logo" className="w-24 h-auto ml-6" />
      <div>
          {memoizedUser? (
            <p className="text-lg font-semibold text-primary">
              GHS {balance}.00
            </p>
          ) : (
            <p className="text-lg font-semibold text-primary"></p>
          )}
        </div>
      {/* Search Bar (Hidden on Mobile, Shown on Tablet & Desktop) */}
      <div className="hidden md:block w-[45%] xl:w-[40%]">
        {location.pathname !== "/profile" && (
          <SearchBar query={query} setQuery={setQuery} />
        )}
      </div>

      {/* Desktop Icons (Shown on Tablet & Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        {location.pathname !== "/profile" && (
          <Link to="/profile">
            <div className="w-12 h-12 flex items-center justify-center bg-[#14B1B9] text-white rounded-full border-4 border-border-primary">
              <FaRegUser size={18} />
            </div>
          </Link>
        )}
        <div className="w-12 h-12 flex items-center justify-center border border-border-default rounded-xl bg-bg-tertiary">
          {getIcon()}
        </div>
      </div>
      <div className="sm:block md:hidden">
        <div className="flex items-center space-x-4">
          <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
            <div className="w-12 h-12 flex items-center justify-center bg-[#14B1B9] text-white rounded-full border-4 border-border-primary">
              <FaRegUser size={18} />
            </div>
          </Link>
          {/* Mobile Menu Icon (Only Visible on Small Screens) */}
          <button
            className="sm:block md:hidden  items-center text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <div className="w-12 h-12 flex items-center justify-center border border-border-default rounded-xl bg-bg-tertiary">
                <FaTimes size={16} color="#c3c3c3" />
              </div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center border border-border-default rounded-xl bg-bg-tertiary">
                <FaBars size={16} color="#c3c3c3" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Only Shows When Open) */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white  flex  items-center p-4 space-x-4 border-y border-border-default md:hidden">
          {/* Search Bar in Mobile Menu */}
          <SearchBar query={query} setQuery={setQuery} className="w-[80%]" />

          {/* Profile Icon in Mobile Menu */}

          {/* Notification Icon in Mobile Menu */}
          <div className="w-12 h-12 flex items-center justify-center border border-border-default rounded-xl bg-bg-tertiary">
            {getIcon()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
