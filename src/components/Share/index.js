import React, { useMemo } from "react";
import { ShareData } from "../../data/share";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Share = () => {
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const handleClick = (e) => {
    if (memoizedUser === null) {
      alert("Log in to view your commission or share feature");
    }
  };

  const disabled = memoizedUser === null ? true : false;

  return (
    <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
      {ShareData.map((share, index) => (
        <NavLink
          onClick={handleClick}
          key={index}
          className="flex items-center justify-between py-4 "
          to={disabled ? "#" : share.route}
        >
          <div className="flex items-center space-x-2">
            <img src={share.img} alt={share.title} className="w-6 h-6 " />
            <span className="font-normal text-md">{share.title}</span>
          </div>
          <img src={"chevronr.svg"} alt="" />
        </NavLink>
      ))}
    </div>
  );
};

export default Share;
