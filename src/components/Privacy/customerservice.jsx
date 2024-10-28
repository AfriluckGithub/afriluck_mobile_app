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
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    if (selectedPhone !== null) {
      const phoneNumber = DATA[selectedPhone].number;
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          console.log("Number copied to clipboard:", phoneNumber); // Debugging
          setOpen(true); // Show the toast
          setTimeout(() => {
            setOpen(false); // Hide the toast after 2 seconds
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err); // Debugging
        });
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Customer Service" />
      <div className="w-full flex flex-col items-center bg-white rounded-xl p-6 my-20 space-y-8">
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
          onClick={handleCopy} // Call handleCopy on button click
        >
          Copy
        </button>
      </div>

      {/* Toast Notification */}
      {open && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg"
          role="alert"
          aria-labelledby="hs-toast-success-example-label"
        >
          <div className="flex p-4">
            <div className="shrink-0">
              <svg
                className="shrink-0 size-4 text-teal-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
            </div>
            <div className="ms-3">
              <p
                id="hs-toast-success-example-label"
                className="text-sm text-gray-700"
              >
                Number copied!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customerservice;
