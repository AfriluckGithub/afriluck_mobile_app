import React, { useState, useEffect } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";

const ChangePaymentPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    navigate("/accountsecurity");
  };

  const handleVerification = () => {
    if (password !== newPassword || newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
    } else {
      // Proceed with verification logic if needed
      console.log("Passwords match, proceed with verification.");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmNewPassword(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        handleVerification();
      }, 2300)
    );
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);
  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6 mt-6">
      <Subheader title="Change Payment Password" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          Please set a payment password
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"password"}
            placeholder={"Old Password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            type={"password"}
            placeholder={"New Password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <Input
            type={"password"}
            placeholder={"Confirm new password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />

          <div className="flex flex-col space-y-2">
            <Button
              label={"Change Password"}
              className="bg-secondary text-primary"
              disabled={!password || !newPassword || !confirmNewPassword}
              onClick={openModal}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onSuccess={handleSuccess}
        type={"success"}
        title="Success"
        subtitle="Changes saved"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default ChangePaymentPassword;
