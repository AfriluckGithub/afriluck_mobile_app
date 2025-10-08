import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
// import Modal from "../modal";

const ResetPasswordScreenUnAutheenticated = () => {
  //const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const phoneNumber = localStorage.getItem("phoneNumberTemp");

  // const openModal = () => {
  //   setOpen(true);
  // };

  const handleSuccess = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://app-api.afriluck.com/api/V1/app/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const json = await response.json();

      console.log("JSON => ", json);
      setLoading(false);
      if (response.status === 200) {
        navigate("/login");
      } else {
        const errorMessage = json.error.password[0];
        setMessage(errorMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (typingTimeout) {
  //       clearTimeout(typingTimeout);
  //     }
  //   };
  // }, [typingTimeout]);

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Reset Password" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-black mb-4">
          Please provide a password
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"text"}
            placeholder={"Phone Number"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={phoneNumber}
            disabled={true}
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type={"password"}
            placeholder={"Confirm password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);

              // if (typingTimeout) {
              //   clearTimeout(typingTimeout);
              // }

              // setTypingTimeout(
              //   setTimeout(() => {
              //     handleVerification();
              //   }, 1000)
              // );
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Reset Password"}
              className="bg-primary text-white"
              disabled={!password || !confirmPassword}
              onClick={handleSuccess}
            />
          </div>
          {loading && (
            <div className="flex justify-center items-center">
              <OrbitProgress
                color="#000"
                size="small"
                text="loading"
                textColor=""
              />
            </div>
          )}
          {message && (
            <div className="flex justify-center items-center text-red text-wrap text-center text-sm">
              {message}
            </div>
          )}
        </div>
      </div>
      {/* <Modal
        isOpen={open}
        onSuccess={handleSuccess}
        type={"success"}
        title="Success"
        subtitle="Password reset successful"
        buttonText="Login"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      /> */}
    </div>
  );
};

export default ResetPasswordScreenUnAutheenticated;
