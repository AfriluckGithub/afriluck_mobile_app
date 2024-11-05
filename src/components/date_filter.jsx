import React, { useState } from "react";

const DateFilter = ({ applyClick }) => {
  const [selectedDays, setSelectedDays] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);

  const handleDaySelect = (days) => {
    setSelectedDays(days);
    setFromDate("");
    setToDate("");
    setIsCustomDate(false);
  };

  const handleToggle = (value) => {
    setIsCustomDate(value);
    if (value) {
      setSelectedDays(1); // Reset to default when switching to custom date
    }
  };

  return (
    <div className="fixed p-6 inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 size-full">
      <div className="p-6 w-full bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-lg font-bold mb-4">Date Filters</h2>
        <div className="flex flex-col border rounded-xl">
          <div className="flex items-center w-full px-4 py-2 justify-between border-b">
            <p>Days</p>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={!isCustomDate}
                onChange={() => handleToggle(false)}
                className="hidden"
              />
              <div
                className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                  !isCustomDate
                    ? "bg-[#156064] border-[#156064]"
                    : "border-[#C3D0DB]"
                }`}
              >
                {!isCustomDate && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </label>
          </div>
          <div className="flex space-x-4 p-4">
            {[1, 7, 30].map((days) => (
              <div
                key={days}
                className={`flex-1 flex-col items-center justify-center p-2 border rounded-lg ${
                  selectedDays === days
                    ? "bg-[#F6FCFD] border-[#3DB6BC] border-2"
                    : "border-[#E6ECF0]"
                }`}
                onClick={() => handleDaySelect(days)}
              >
                <p className="text-center">{days}</p>
                <p className="text-center">{days === 1 ? "Day" : "Days"}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col border rounded-lg">
          <div className="flex items-center">
            <div className="flex items-center w-full px-4 py-2 justify-between border-b">
              <p>Custom Date</p>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={isCustomDate}
                  onChange={() => handleToggle(true)}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                    isCustomDate
                      ? "bg-[#156064] border-[#156064]"
                      : "border-[#C3D0DB]"
                  }`}
                >
                  {isCustomDate && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </label>
            </div>
          </div>
          {isCustomDate && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={applyClick}
          className="w-full bg-[#156064] text-white p-4 rounded-lg hover:bg-teal-800"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
