import React, { useState } from "react";
import Subheader from "../subheader";
import { DATA } from "../../data/transactions";
import DateFilter from "../date_filter";

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleApplyClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-auto bg-[#F7F7F7] p-6">
      <Subheader
        title="Transactions"
        image={"filter.svg"}
        onIconClick={handleIconClick}
      />

      <div className="flex flex-col w-full h-screen space-y-6 rounded-xl mt-20">
        <div className=" flex items-start">
          <div className="p-3 bg-[#EDEDED] rounded-xl flex items-center">
            <p>August,2024</p>
          </div>
        </div>
        {DATA.map((data) => (
          <div
            key={data}
            className="flex flex-col p-4 bg-white w-full rounded-xl space-y-4"
          >
            <p className="text-[#7C7C7C] text-sm">{data.time}</p>
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={data.icon}
                  alt=""
                  width={40}
                  className="rounded-full items-center"
                />
                <div>
                  <h1 className=" text-base font-medium">{data.title}</h1>
                  <p className="text-[#7C7C7C] text-sm">{data.phone_number}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`${
                    data.type === "Lost"
                      ? "bg-[#FF0000] text-white"
                      : data.type === "Win" || data.type === "Successful"
                      ? "bg-[#4CC976] text-white"
                      : "bg-[#EDEDED] text-black"
                  } px-2 py-1 rounded-md text-xs font-medium`}
                >
                  {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                </span>
                <p className="text-sm font-medium">GHS {data.amount}.00</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 border-t pt-2">
              <p className="text-[#7C7C7C] text-sm">Draw {data.draw}</p>
              <p className="text-[#7C7C7C] text-sm">{data.date}</p>
            </div>
          </div>
        ))}
        <div className=" flex items-start">
          <div className="p-3 bg-[#EDEDED] rounded-xl flex items-center">
            <p>July,2024</p>
          </div>
        </div>
        {DATA.map((data) => (
          <div
            key={data}
            className="flex flex-col p-4 bg-white w-full rounded-xl space-y-4"
          >
            <p className="text-[#7C7C7C] text-sm">{data.time}</p>
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={data.icon}
                  alt=""
                  width={40}
                  className="rounded-full items-center"
                />
                <div>
                  <h1 className=" text-base font-medium">{data.title}</h1>
                  <p className="text-[#7C7C7C] text-sm">{data.phone_number}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`${
                    data.type === "Lost"
                      ? "bg-[#FF0000] text-white"
                      : data.type === "Win" || data.type === "Successful"
                      ? "bg-[#4CC976] text-white"
                      : "bg-[#EDEDED] text-black"
                  } px-2 py-1 rounded-md text-xs font-medium`}
                >
                  {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                </span>
                <p className="text-sm font-medium">GHS {data.amount}.00</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 border-t pt-2">
              <p className="text-[#7C7C7C] text-sm">Draw {data.draw}</p>
              <p className="text-[#7C7C7C] text-sm">{data.date}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <DateFilter applyClick={handleApplyClick} />}
    </div>
  );
};

export default Transactions;
