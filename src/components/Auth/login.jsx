import React, { useState } from "react";
import Subheader from "../subheader";
import { NavLink } from "react-router-dom";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [open, 
    //setOpen
    ] = useState(false);
  const [loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const { setCurrentUser, toggleLogin } = useAuth();

  const openModal = async () => {
    setLoading(true);
    const requestBody = {
      phone_number: phoneNumber,
      password: password,
    };
    try {
      const res = await axios.post(
        "https://staging.afriluck.com/api/V1/app/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setLoading(false);
      if (res.status === 200) {
        setCurrentUser(res.data.success);
        handleSuccess();
      }
    } catch (error) {
      setLoading(false);
      try {
        console.log(error);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSuccess = () => {
    toggleLogin(); // Set the user as logged in
    navigate("/profile"); // Navigate to the profile screen
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Validate to ensure the phone number is up to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value); // Update state if valid
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Login" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"number"}
            placeholder={"020 000 0000"}
            icon={"ghana.svg"}
            className="bg-[#F5F5F7] input-md"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
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
          <NavLink
            to="/forgotpassword"
            className="text-base text-[#156064] mb-4 text-center font-semibold"
          >
            Forgot Password?
          </NavLink>
          <div className="flex flex-col space-y-2">
            <Button
              label={"Login"}
              className="bg-primary text-white"
              disabled={!phoneNumber || !password}
              onClick={openModal}
            />
            <Button
              label={"Signup"}
              className="bg-secondary text-primary"
              onClick={handleSignup}
            />
          </div>
          <div className="flex justify-center items-center w-full h-auto">
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
          <div className="flex flex-col space-y-2">
            <div className="flex w-full justify-center items-center text-base mt-4 space-x-2">
              <img src="18plus.svg" alt="18plus" className="w-6 h-6" />
              <p>Play Responsibly</p>
            </div>
            <p className="text-center text-base text-text-muted">
              version 1.0.0
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onSuccess={handleSuccess}
        type={"success"}
        title="Success"
        subtitle="Login successful"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default LoginScreen;
