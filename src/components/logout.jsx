import React, { useState } from "react";
import Modal from "./modal";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(logout());
    setOpen(true);
  };

  const closeModal = () => {
    dispatch(logout());
    window.location.reload();
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between px-4 py-6 bg-white rounded-xl">
        <div
          className="flex flex-row items-center space-x-2 cursor-pointer"
          onClick={openModal}
        >
          <img src={"logout.svg"} alt="Logout Icon" width={24} />
          <p className="text-[#FF0000] font-semibold">Log Out</p>
        </div>
        <div>
          <p className="text-[#8C8C8C]">version 1.0.0</p>
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={closeModal}
        onSuccess={handleLogout}
        type={"failure"}
        title="Log out"
        subtitle="Are you sure you want to log out of this application?"
        buttonText="Yes, Log out"
        imageSrc="logout.svg"
        imgBg={"#FFF9F9"}
      />
    </>
  );
};

export default Logout;
