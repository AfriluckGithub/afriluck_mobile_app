import React, { useState } from "react";
import Button from "./button";

const TopUpModal = ({ isOpen, onCancel }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="flex flex-col">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Topup</h2>

            <label className="block text-gray-700 font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-4"
              placeholder="Enter amount"
            />

            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-4"
              placeholder="Enter mobile number"
            />

            <div className="flex justify-between mt-4">
              <Button
                label={"Cancel"}
                onClick={() => onCancel(false)}
                className="bg-danger-500 text-white w-auto font-medium"
              >
                Cancel
              </Button>
              <Button
                label={"Top Up"}
                onClick={() => alert(`Topping up ${amount} to ${mobileNumber}`)}
                className="bg-secondary text-primary w-auto font-medium"
                size="sm"
              >
                Top Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpModal;
