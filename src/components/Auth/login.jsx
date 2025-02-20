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
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
//import { BsArrowLeft } from "react-icons/bs";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [open] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { toggleLogin } = useAuth();
  const dispatch = useDispatch();

  const openModal = async () => {
    setLoading(true);
    const requestBody = {
      phone_number: phoneNumber,
      password: password,
    };
    try {
      const res = await axios.post(
        "https://app.afriluck.com/api/V1/app/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (res.status === 200) {
        dispatch(login(res.data.success));
        handleSuccess();
      } else if (res.status === 401) {
        setError(res.response.data.error.message);
      }
    } catch (error) {
      setLoading(false);
      try {
        if (error.status === 401) {
          setError(error.response.data.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSuccess = () => {
    toggleLogin();
    navigate("/profile");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  // const back = () => {
  //   navigate("/single_game");
  // };

  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Login" />
      {/* <div className="bg-white flex w-full h-auto py-6 px-48 border-b border-border-default ">
        <div className="flex cursor-pointer  items-center ml-2">
          <div
            onClick={back}
            className="flex items-center space-x-4 p-3 w-auto border-border-default border rounded-xl bg-bg-tertiary"
          >
            <BsArrowLeft />
            <p className="flex justify-start items-start text-black">Login</p>
          </div>
          <div className="text-xl font-Poppins w-full justify-center items-center">
                  <p className="flex justify-center items-center text-black">
                    {type}
                  </p>
                </div>
        </div>
      </div> */}
      {/* <Subheader title="Login" /> */}
      <div className="flex w-full items-center justify-center ">
        <div className="flex flex-col  items-center justify-center bg-white rounded-xl   w-full ">
          <img src="afriluck.svg" alt="afriluck" className="my-6" />
          <div className="flex flex-col w-screen max-w-md space-y-6 px-12 md:px-0 py-6">
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
              value={password}
              rightIcon
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
            <div>
              {error ? (
                <p className="flex justify-center items-center text-rose-500 text-sm">
                  {error}
                </p>
              ) : (
                <p></p>
              )}
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
