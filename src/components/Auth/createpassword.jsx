import React, { useState, useEffect } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();

  const handleVerification = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Proceed with verification logic if needed
      console.log("Passwords match, proceed with verification.");
    }
  };

  const handleNext = async () => {
    navigate("/paymentpassword");
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Create Password" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          Please provide a password
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
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
              label={"Continue"}
              className="bg-secondary text-primary"
              disabled={!password || !confirmPassword}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
