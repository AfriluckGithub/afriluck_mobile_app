import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";

const ChangePaymentPassword = () => {
  const [password, setPassword] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    navigate("/");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleFatherChange = (e) => {
    const value = e.target.value;
    setFather(value);
  };

  const handleMotherChange = (e) => {
    const value = e.target.value;
    setMother(value);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Change Payment Password" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          Please set a payment password
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"password"}
            placeholder={"Password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            rightIcon
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="text-center text-base text-text-black mb-4">
            Security Questions
          </p>
          <Input
            type={"text"}
            placeholder={"What's your father's middle name?"}
            className="bg-[#F5F5F7] input-md"
            value={father}
            onChange={handleFatherChange}
          />
          <Input
            type={"text"}
            placeholder={"What's your mother's middle name?"}
            className="bg-[#F5F5F7] input-md"
            value={mother}
            onChange={handleMotherChange}
          />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Continue"}
              className="bg-secondary text-primary"
              disabled={!password || !father || !mother}
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
        subtitle="Account has been created successfully"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default ChangePaymentPassword;
