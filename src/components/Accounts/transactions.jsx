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
    <div className="flex flex-col w-full h-screen h-auto bg-[#F7F7F7] p-6">
      <Subheader
        title="Transactions"
        image={"filter.svg"}
        onIconClick={handleIconClick}
      />

      <div className="flex flex-col w-full space-y-6 rounded-xl mt-20">
        {DATA.map((data) => (
          <>
            <div className=" flex items-start">
              <div
                className="flex items-center"
                style={{ paddingTop: "23px", paddingBottom: "0px" }}
              >
                <p>{data.date}</p>
              </div>
            </div>
            <div
              key={data}
              className="flex flex-col p-4 bg-white w-full rounded-xl space-y-4"
            >
              <p className="text-[#7C7C7C] text-sm"></p>
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
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium">GHS {data.amount}.00</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {isModalOpen && <DateFilter applyClick={handleApplyClick} />}
    </div>
  );
};

export default Transactions;
