import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";

const VerifyCodeScreenUnAutheenticated = () => {
  const [code, setCode] = useState("");
  const [open, 
    //setOpen
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, source } = location.state || {};
  localStorage.setItem("phoneNumberTemp", phoneNumber);
  // const openModal = () => {
  //   setOpen(true);
  // };

  const verifyOtp = async () => {
    setLoading(true);
    const requestBody = {
      phone_number: phoneNumber,
      otp: code,
    };
    console.log(requestBody);
    
    try {
      const res = await axios.post(
        "https://app.afriluck.com/api/V1/app/verify-password-reset-otp",
        requestBody,
        {
          headers: {
            //Authorization: `Bearer ${memoizedUser.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const response = res.data;
      console.log(response);

      const status = res.status;
      setLoading(false);
      if (status === 200) {
        navigate("/reset-password-unauthenticated", {
          state: { phoneNumber, source },
        });
      }
    } catch (error) {
      try {
        setLoading(false);
        setError(error.response.data.message);
        console.log(error);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleVerificationSuccess = () => {
    console.log("Source:", source);
    if (source === "forgotpassword") {
      navigate("/resetpassword", { state: { phoneNumber , source} });
    } else if (source === "signup") {
      navigate("/createpassword", { state: { phoneNumber, source } });
    } else {
      console.warn("Unexpected source:", source);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Verify Code" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
        <img src="afriluck.svg" alt="afriluck" className="mb-6" />
        <p className="text-center text-base text-text-black mb-4">
          Enter verification code sent to{" "}
          <span className="font-semibold">{phoneNumber}</span> below
        </p>
        <div className="flex flex-col w-full max-w-md space-y-6">
          <Input
            type={"number"}
            placeholder={"Enter verification code"}
            className="bg-[#F5F5F7] input-md"
            value={code}
            onChange={handleCodeChange}
          />
          <NavLink
            to="/signup"
            className="text-base text-primary mb-4 text-center font-semibold"
          >
            Resend Code
          </NavLink>
          <div className="flex flex-col space-y-2">
            <Button
              label={"Verify Code"}
              className="bg-primary text-white"
              disabled={!code}
              onClick={verifyOtp}
            />
          </div>
        </div>
        <div>
          {error ? (
            <p className="flex justify-center items-center w-full text-rose-500 text-sm text-wrap text-center">
              {error}
            </p>
          ) : (
            ""
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
      </div>
      <Modal
        isOpen={open}
        onSuccess={handleVerificationSuccess}
        type={"success"}
        title="Success"
        subtitle="Verification successful"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default VerifyCodeScreenUnAutheenticated;
