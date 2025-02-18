import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Dropdown from "../dropdown";
import Avatar from "./avatar";
import { useAvatar } from "../../context/AvatarContext";
const ProfileScreen = () => {
  const regions = [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Eastern",
    "Volta",
    "Brong Ahafo",
    "Northern",
    "Upper East",
    "Upper West",
    "Savannah",
    "North East",
    "Oti",
    "Bono East",
    "Ahafo",
    "Bono West",
  ];
  const ID = ["Voter ID", "Driver's License", "Passport", "National ID"];
  const gender = ["Male", "Female"];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    navigate("/profile");
  };
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Validate to ensure the phone number is up to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value); // Update state if valid
    }
  };
  const handleIDNumberChange = (e) => {
    const value = e.target.value;
    setIDNumber(value);
  };
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const { setAvatar } = useAvatar();

  const handleAvatarUpdate = (newImage) => {
    setAvatar(newImage);
  };

  return (
    <div className="flex flex-col items-center h-full bg-[#F7F7F7] p-6">
      <div className="mb-6">
        <Subheader title="Profile" />
      </div>
      <div className="flex flex-col  h-full w-[30%]  items-center justify-center  bg-white rounded-xl px-6 py-6 my-24 space-y-4">
        <div className="flex flex-col w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Avatar onUpdate={handleAvatarUpdate} />
          </div>
          <Input
            type={"text"}
            placeholder={"Username"}
            className="bg-[#F5F5F7] input-md w-full"
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            type={"date"}
            placeholder={"Date of birth"}
            className="bg-[#F5F5F7] input-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Dropdown items={regions} defaultText="Select a region" />
          <Input
            type={"number"}
            placeholder={"020 000 0000"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Dropdown items={ID} defaultText="Select ID type" />
          <Input
            type={"password"}
            placeholder={"Enter ID number"}
            className="bg-[#F5F5F7] input-md"
            value={IDNumber}
            onChange={handleIDNumberChange}
          />
          <Input
            type={"text"}
            placeholder={"Enter your city or town"}
            className="bg-[#F5F5F7] input-md"
            value={city}
            onChange={handleCityChange}
          />
          <Dropdown items={gender} defaultText="Select gender" />
          <div className="flex flex-col space-y-2">
            <Button
              label={"Save"}
              className="bg-primary text-white"
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

export default ProfileScreen;
