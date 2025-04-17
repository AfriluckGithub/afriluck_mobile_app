import React, { useMemo, useState } from "react";
import Subheader from "../subheader";
import Button from "../button";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const openModal = () => {
    setOpen(true);
  };

  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const deleteAccount = async () => {
    setLoading(true);
    console.log("Token => ", memoizedUser.token);
    try {
      const response = await fetch(
        "https://app-api.afriluck.com/api/V1/app/delete-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${memoizedUser.token}`,
          },
        }
      );
      const json = await response.json();
      console.log("Response => ", json);
      if (response.status === 200) {
        setLoading(false);
        openModal();
      } else {
        setLoading(false);
        console.log("Error => ", json.error);
        setError(json.error);
      }
    } catch (e) {
      console.log("Error => ", e);
    }
  };

  const handleSuccess = () => {
    navigate("/login", { state: { message: "Account deleted successfully" } });
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
                <p className="text-sm font-semibold">GHS {memoizedUser?.balance}</p>
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
            <span className="font-semibold text-text-black">
              {memoizedUser?.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
            </span>{" "}
            of the account
          </p>
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
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          <div className="flex flex-col space-y-2">
            <Button
              label={"Send Code"}
              className="bg-primary text-white"
              onClick={deleteAccount}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onSuccess={handleSuccess}
        type={"success"}
        title="Success"
        subtitle="Account deleted successfully"
        buttonText="Okay"
        imageSrc="check.svg"
        imgBg={"#F6F6F6"}
      />
    </div>
  );
};

export default DeleteAccount;
