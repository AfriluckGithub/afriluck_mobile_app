import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("https://staging.afriluck.com/api/V1/app/register", 
      {
        first_name: lastName,
        last_name: firstName,
        phone_number: phoneNumber,
        password: password,
      });
      if (res.status === 200) {
        openModal();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // const handleSuccess = async (phoneNumber, source = "signup") => {
  //   // navigate("/verifycode", { state: { phoneNumber, source } });
  // };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Signup" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          New user sign up
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"text"}
            placeholder={"First Name"}
            className="bg-[#F5F5F7] input-md"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <Input
            type={"text"}
            placeholder={"Last Name"}
            className="bg-[#F5F5F7] input-md"
            value={lastName}
            onChange={handleLastNameChange}
          />

          <Input
            type={"number"}
            placeholder={"020 000 0000"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />

          <Input
            type={"text"}
            placeholder={"Password"}
            className="bg-[#F5F5F7] input-md"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="flex flex-col space-y-2">
            <Button
              label={"Register"}
              className="bg-secondary text-primary"
              disabled={!phoneNumber}
              onClick={handleSignUp}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onSuccess={() => navigate("/login")}
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

export default SignupScreen;
