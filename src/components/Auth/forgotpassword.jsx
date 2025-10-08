import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = async (phoneNumber, source = "forgotpassword") => {
    const requestBody = {
      phone_number: phoneNumber,
    };
    console.log(requestBody);

    const response = await fetch(
      "http://10.180.180.22:5011/api/V1/app/request-password-reset-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const json = await response.json();
    const status = response.status;

    console.log(json);

    if (status === 200) {
      console.log(json);
      navigate("/verifycode-unauthenticated", {
        state: { phoneNumber, source },
      });
    } else {
      console.log(`An error occurred ${json}`);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Validate to ensure the phone number is up to 10 digits
    if (/^\d{0,13}$/.test(value)) {
      setPhoneNumber(value); // Update state if valid
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Forgot Password" />
      <div className="flex flex-col w-full lg:w[40%]  items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          A verification code will be sent to the number you provide below
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"number"}
            placeholder={"020 000 0000"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Send Code"}
              className="bg-primary text-white"
              disabled={!phoneNumber}
              onClick={openModal}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onSuccess={() => handleSuccess(phoneNumber, "forgotpassword")}
        type={"success"}
        title="Success"
        subtitle="Verification code sent"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default ForgotPassword;
