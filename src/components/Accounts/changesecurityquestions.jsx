import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";

const ChangeSecurityQuestions = () => {
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    navigate("/accountsecurity");
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
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6 mt-6">
      <Subheader title="Change Security Questions" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-lg font-medium text-text-black mb-4">
          Modify the security questions
        </p>
        <div className="flex w-full">
          <p className=" text-base text-text-black ">Security Questions</p>
        </div>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"text"}
            placeholder={"Enter your first security question"}
            className="bg-[#F5F5F7] input-md"
            value={father}
            onChange={handleFatherChange}
          />
          <Input
            type={"text"}
            placeholder={"Enter your second security question"}
            className="bg-[#F5F5F7] input-md"
            value={mother}
            onChange={handleMotherChange}
          />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Update"}
              className="bg-secondary text-primary"
              disabled={!father || !mother}
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

export default ChangeSecurityQuestions;
