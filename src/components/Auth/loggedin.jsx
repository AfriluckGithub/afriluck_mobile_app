import React, { useMemo } from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";
import { useSelector } from "react-redux";
const LoggedIn = () => {
  const { avatar } = useAvatar();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
      return user ? { ...user } : null;
  }, [user]);

  const username = memoizedUser === null? "Username": `${memoizedUser.first_name} ${memoizedUser.last_name}`;
  const phoneNumber =
  memoizedUser === null ? "0202020202" : memoizedUser.phone_number;

  return (
    <div className="flex flex-col w-full space-y-6   py-4">
      <div className="flex flex-row space-x-4 p-4 w-full  items-center bg-white rounded-xl">
        <div
          style={{ backgroundColor: "#156064" }}
          className="avatar flex h-12 w-12 text-center text-white rounded-full font-semibold justify-center items-center"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="afriluck"
              className="w-full h-full object-cover"
            />
          ) : (
            <img src="default.svg" alt="afriluck" className="w-full h-full" />
          )}
        </div>

        <div className="flex flex-col w-full">
          <p className="text-lg font-semibold">{username}</p>
          <p className="text-sm text-text-muted">{phoneNumber}</p>
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
          <p className="text-lg font-semibold">GHS 0.00</p>
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
          <p className="text-lg font-semibold">GHS 0.00</p>
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
