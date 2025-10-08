import React, { useState } from "react";
import Subheader from "../subheader";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";

const SignupScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [
    open,
    //setOpen
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    const errors = [];
    const minLength = 8;

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long.`);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must include at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include at least one special character.");
    }
    if (/\s/.test(password)) {
      errors.push("Password must not contain spaces.");
    }
    if (/^\d+$/.test(password)) {
      errors.push("Password must not be only numbers.");
    }

    return errors;
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (errors.length > 0) {
      setLoading(false);
      return;
    }
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      password: password,
      ref: String(ref)
    };

    console.log("Request body => ", requestBody);
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    console.log(requestBody);

    try {
      const res = await axios.post(
        "http://10.180.180.22:5011/api/V1/app/register",
        requestBody,
        { headers }
      );
      setLoading(false);
      console.log("Login Response => ", res);

      if (res.status === 200) {
        dispatch(login(res.data.success));
        localStorage.setItem("register_token", res.data.success.token);
        console.log("Reg Token => ", localStorage.getItem("register_token"));
        localStorage.setItem("tempPhone", res.data.success.phone_number);
        navigate("/verifycode");
      }
    } catch (e) {
      setLoading(false);
      setError(e.response.data.error);
      console.log(e.response.data.error);
    }
  };

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

    const validationErrors = validatePassword(value);
    setErrors(validationErrors);

    console.log(validationErrors);
  };

  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Signup" />
      <div className="flex flex-col w-full  items-center justify-center  bg-white rounded-xl p-6 my-20 space-y-4">
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
            type={"password"}
            rightIcon
            placeholder={"Password"}
            icon={"password.svg"}
            className="bg-[#F5F5F7] input-md"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            {errors.map((error, index) => (
              <p
                key={index}
                style={{ color: "red" }}
                className="flex text-sm justify-center"
              >
                <p>
                  {`${index + 1} .`} {error}
                </p>
              </p>
            ))}
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
          <div className="flex flex-col space-y-2">
            <Button
              label={"Register"}
              className="bg-primary text-white"
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
