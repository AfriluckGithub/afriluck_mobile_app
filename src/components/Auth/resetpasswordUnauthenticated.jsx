import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import { useNavigate } from "react-router-dom";


const ResetPasswordScreenUnAutheenticated = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [open, setOpen] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();
  // const openModal = () => {
  //   setOpen(true);
  // };

  const handleSuccess = async () => {
    const response = await fetch(
      "https://app.afriluck.com/api/V1/app/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          password: password,
          password_confirmation: confirmPassword,
        }),
      }
    );
    // const json = await response.json();

    console.log("JSON => ", response);

    if (response.status === 200) {
      navigate("/login");
    }
  };

  const handleVerification = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Proceed with verification logic if needed
      console.log("Passwords match, proceed with verification.");
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
        <p className="text-center text-base text-text-black mb-4">
          Please provide a password
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"text"}
            placeholder={"Phone Number"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

              if (typingTimeout) {
                clearTimeout(typingTimeout);
              }

              setTypingTimeout(
                setTimeout(() => {
                  handleVerification();
                }, 2300)
              );
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Reset Password"}
              className="bg-secondary text-primary"
              disabled={!password || !confirmPassword}
              onClick={handleSuccess}
            />
          </div>
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
