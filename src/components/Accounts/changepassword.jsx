import React, { useState, useEffect, useMemo } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [
    typingTimeout,
    //setTypingTimeout
  ] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const user = useSelector((state) => state.user.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const _handlePasswordChange = async () => {
    try {
      setLoading(true);
      const requestBody = {
        current_password: password,
        password: newPassword,
      };
      console.log(requestBody);
      const res = await axios.post(
        "https://staging.afriluck.com/api/V1/app/update-password",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${memoizedUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (res.status === 200) {
        //openModal();
        //setTimeout(() => {
        //handleSuccess();
        openModal();
        //}, 2300)
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleSuccess = () => {
    navigate("/profile");
  };

  // const handleVerification = () => {
  //   if (password !== newPassword || newPassword !== confirmNewPassword) {
  //     console.log("Passwords do not match!");
  //   } else {
  //     // Proceed with verification logic if needed
  //     console.log("Passwords match, proceed with verification.");
  //   }
  // };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
  };

  // const handleConfirmNewPasswordChange = (e) => {
  //   const value = e.target.value;
  //   setConfirmNewPassword(value);

  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  //   setTypingTimeout(
  //     setTimeout(() => {
  //       handleVerification();
  //     }, 2300)
  //   );
  // };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);
  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6 mt-6">
      <Subheader title="Change  Password" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          Please provide a password
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
          {/* <Input
            type={"password"}
            placeholder={"Confirm new password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          /> */}

          <div className="flex flex-col space-y-2">
            <Button
              label={"Change Password"}
              className="bg-secondary text-primary"
              disabled={!password || !newPassword}
              onClick={_handlePasswordChange}
            />
          </div>
        </div>
        {loading ? (
          <OrbitProgress
            color="#000"
            size="small"
            text="loading"
            textColor=""
          />
        ) : (
          <p></p>
        )}
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

export default ChangePassword;
