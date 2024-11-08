import React, { useState } from "react";
import Modal from "./modal";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { isLoggedIn, toggleLogout } = useAuth(); // Use context for login state and logout function
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      toggleLogout(); // Call the logout function from context
    }
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
