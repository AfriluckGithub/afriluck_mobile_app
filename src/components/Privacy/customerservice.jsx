import React, { useState } from "react";

import Subheader from "../subheader";

const DATA = [
  {
    number: "0241234567",
  },
  {
    number: "0554588483",
  },
  {
    number: "0545302875",
  },
];

const Customerservice = () => {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCopy = () => {
    console.log("Copy button clicked"); // Debugging: Check if the function is called
    if (selectedPhone !== null) {
      const phoneNumber = DATA[selectedPhone].number;
      console.log("Selected phone number:", phoneNumber); // Debugging: Check the selected phone number
      // Check if the clipboard API is available
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(phoneNumber)
          .then(() => {
            console.log("Number copied to clipboard:", phoneNumber); // Debugging
            setOpenModal(true); // Show the modal
            setTimeout(() => {
              setOpenModal(false);
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err); // Debugging
          });
      } else {
        console.error("Clipboard API not available"); // Debugging
      }
    } else {
      console.log("No phone number selected"); // Debugging: Check if a phone number is selected
    }
  };

  // Modal Component
  const Modal = ({ isOpen }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-semibold">Success</h2>
          <p>Number copied to clipboard!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Customer Service" />

      <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
        <div className="w-full flex flex-col items-center text-center space-y-1">
          <div
            className={`w-20 h-20 mb-4 bg-[#f6f6f6] rounded-full flex flex-col items-center justify-evenly`}
          >
            <img
              src={"customerservice.svg"}
              alt="Modal Icon"
              className="w-10 h-10"
            />
          </div>
          <h1 className="text-xl font-medium">Customer Service</h1>
          <p className="text-base text-[#7C7C7C] font-normal">
            Call to get any clarification you need from our support team on
            standby 24/7
          </p>
        </div>
        <div className="w-full space-y-4">
          {DATA.map((phone, index) => (
            <div
              key={index}
              className="flex flex-row justify-between w-full p-4 border rounded-lg"
            >
              <div className="flex space-x-2">
                <img src="call.svg" alt="" className="w-6 h-6" />
                <p className="font-medium">{phone.number}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="hs-default-radio"
                  className="hidden" // Hide the default radio button
                  id={`hs-default-radio-${index}`}
                  checked={selectedPhone === index}
                  onChange={() => setSelectedPhone(index)}
                />
                <label
                  htmlFor={`hs-default-radio-${index}`}
                  className={`flex items-center justify-center w-6 h-6 border-2 rounded-full cursor-pointer ${
                    selectedPhone === index
                      ? "bg-[#156064] border-[#156064]"
                      : "border-[#C3D0DB]"
                  }`}
                >
                  {selectedPhone === index && (
                    <span className="w-3 h-3 bg-white rounded-full" />
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`w-full py-4 px-4 font-semibold text-white rounded-lg ${
            selectedPhone === null
              ? "bg-[#FAFBFC] text-[#A1B3C2] cursor-not-allowed" // Disabled state styling
              : "bg-[#156064] hover:bg-[#156064]"
          }`}
          disabled={selectedPhone === null}
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={openModal} />
    </div>
  );
};

export default Customerservice;
