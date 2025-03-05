import React, { useMemo, useState } from "react";

import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../context/AvatarContext";
import { useSelector } from "react-redux";
import TopUpModal from "../TopupModal";

const LoggedIn = () => {
  const { avatar } = useAvatar();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0.0);

  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const username =
    memoizedUser === null
      ? "Username"
      : `${memoizedUser.first_name} ${memoizedUser.last_name}`;
  const phoneNumber =
    memoizedUser === null ? "0202020202" : memoizedUser.phone_number;

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

  if (!isOpen) {
    getBanalce();
  }

  return (
    <div className="flex flex-col w-full space-y-6  py-4">
      <div className="flex flex-row space-x-4 p-4 w-full  items-center bg-white rounded-xl border border-border-default">
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
      <div className="flex w-full space-x-6">
        <div className="flex flex-col w-full items-center  bg-white rounded-xl p-4 space-y-4 border border-border-default">
          <div className="flex items-center space-x-2">
            <img src="credit.svg" alt="afriluck" className="w-6 h-6" />
            <p className="text-sm font-regular">Credit</p>
          </div>
          <p className="text-lg font-semibold">
            GHS {balance}.00
          </p>
          <Button
            label="Topup"
            onPress={() => setIsOpen(true)}
            className="bg-secondary text-primary w-full font-medium"
            size="lg"
          >
            Topup
          </Button>
          <TopUpModal isOpen={isOpen} onCancel={() => setIsOpen(false)} />
        </div>
        {/* <div className="flex flex-col w-full items-center  bg-white rounded-xl p-4 space-y-4 border border-border-default">
          <div className="flex  items-center space-x-2">
            <img src="wins.svg" alt="afriluck" className=" w-6 h-6" />
            <p className="text-sm font-regular">Wins Account</p>
          </div>
          <p className="text-lg font-semibold">GHS 0.00</p>
          <Button
            label="Withdraw"
            className="bg-primary text-white w-full font-medium"
            size="lg"
          >
            Withdraw
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default LoggedIn;
