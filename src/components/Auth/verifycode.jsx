import React, { useCallback, useEffect, useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";

const VerifyCodeScreen = () => {
  const [code, setCode] = useState("");
  const [
    open,
    //setOpen
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber, source, errMessage, grantedToken, tag } = location.state || {};
  // const openModal = () => {
  //   setOpen(true);
  // };

  console.log("errMessage => ", errMessage);
  

  const resendOtp = useCallback(async () => {
    setMessage("Resending verification code...");
    setLoading(true);
    console.log("Sending otp to => ", phoneNumber);
    
    try {
      const data = await fetch('https://app.afriluck.com/api/V1/app/resend-otp', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${grantedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "phoneNumber": phoneNumber
        })
      })

      if(data.status === 200) {
        setLoading(false);
        setMessage("Verification code resent successfully");
        const json = await data.json();
        console.log(json);
      }else{
        setLoading(false);
        setMessage("An error occurred");
        console.log("An error occurred");
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [phoneNumber, grantedToken]);

  const verifyOtp = async () => {
    setLoading(true);
    const requestBody = {
      otp: code,
    };
    try {

      const res = await axios.post(
        "https://app.afriluck.com/api/V1/app/verify-otp",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${grantedToken}`,
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
        navigate("/complete", {
          state: { 
            tag: tag,
          },
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
      navigate("/resetpassword");
    } else if (source === "signup") {
      navigate("/createpassword");
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

  useEffect(() => {
    setError(errMessage);
    resendOtp();
  }, [errMessage, resendOtp]);

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Verify Code" />
      <div className="flex flex-col w-full lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-32 space-y-4">
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
          <p
            onClick={resendOtp}
            className="text-base text-primary mb-4 text-center font-semibold"
          >
            Resend Code
          </p>
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
          {message ? (
            <p className="flex justify-center items-center w-full text-green-500 text-sm text-wrap text-center">
              {message}
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

export default VerifyCodeScreen;
