import React, { useState } from "react";
import Subheader from "../subheader";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const handleSuccess = () => {
    navigate("/verifysecuritycode");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Delete Account" />
      <div className="flex flex-col w-full md:w-[60%] 2xl:w-[30%] lg:w-[40%] items-center justify-center  bg-white rounded-xl p-6 my-20">
        <div className="flex flex-col w-full max-w-md space-y-6">
          <p className="text-xl font-medium text-text-black mb-4">
            Are you sure you want to delete your Afriluck account?
          </p>
          <p className="text-base text-text-black mb-4">
            You will permanently delete your Afriluck Account and all your
            services and data, like personal information, fund data,
            transactions data etc will not available.
          </p>
          <div className="flex flex-col w-full rounded-xl bg-[#F5F5F5]">
            <div className="flex w-full p-2 bg-primary text-white items-center rounded-t-xl">
              <p className="pl-2 font-medium">Current Balance</p>
            </div>
            <div className="flex justify-between w-full p-4 md:p-6 rounded-xl bg-[#F5F5F5] space-x-2 md:space-x-4">
              <div className="flex flex-col w-full justify-between  space-y-1  md:p-4 rounded-lg md:rounded-xl">
                <span className="text-wrap text-sm md:text-base font-medium">
                  Credit Account
                </span>
                <p className="text-sm font-semibold">GHS 0.00</p>
              </div>
              <div className=" items-end flex flex-col w-full  space-y-1  md:p-4 rounded-lg md:rounded-xl">
                <span className="text-wrap text-sm md:text-base font-medium">
                  Wins Account
                </span>
                <p className="text-sm font-semibold">GHS 0.00</p>
              </div>
            </div>
          </div>
          <p className="text-base text-text-muted mb-4">
            This operation requires sending a confirmation message to the
            registered mobile phone number{" "}
            <span className="font-semibold text-text-black">0554588483</span> of
            the account
          </p>
          <div className="flex flex-col space-y-2">
            <Button
              label={"Send Code"}
              className="bg-secondary text-primary"
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
        subtitle="Verification code sent successfully"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default DeleteAccount;
