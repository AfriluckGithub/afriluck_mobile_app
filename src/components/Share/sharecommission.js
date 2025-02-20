import React, { useEffect, useMemo, useState } from "react";
import Subheader from "../subheader";
import DATA from "../../data/commission";
import { useSelector } from "react-redux";

const Sharecommission = () => {
  const [commission, setCommission] = useState({});
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  useEffect(() => {
    const getCommission = async () => {
      const response = await fetch(
        "https://app.afriluck.com/api/V1/app/commissions",
        {
          method: 'get',
          headers: {
            'Authorization': `bearer ${memoizedUser.token}`
          }
        }
      );
      const json = await response.json();
      console.log(json);
      setCommission(json.success);
    };
    getCommission();
  }, [memoizedUser.token]);

  console.log(commission);
  
  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Share Commission" />
      <div className="flex flex-col items-center w-full h-screen space-y-6  rounded-xl  mt-20 ">
        <div className="flex items-center justify-between w-full p-4 md:p-6 rounded-xl bg-white space-x-2 md:space-x-4">
          {DATA.Users.map((index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
            >
              <span className="text-sm md:text-base font-medium">
                {index.title}
              </span>
              <p>{index.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center  w-full p-4 md:p-6 rounded-xl bg-white space-x-3 md:space-x-5">
          <div className="flex items-center justify-between w-full">
            <p className="text-[#7C7C7C] text-sm">For</p>
            <p className="text-[#7C7C7C] text-sm">Total Commission</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="font-semibold">Yesterday</p>
            <p className=" font-semibold">GHS {commission.totalCommission}</p>
          </div>
        </div>
        <div className="flex flex-col w-full rounded-xl bg-white">
          <div className="flex w-full p-2 bg-[#156064] text-white items-center rounded-t-xl">
            <p className="pl-2">Level 1 Users</p>
          </div>
          <div className="flex items-center justify-between w-full p-4 md:p-6 rounded-xl bg-white space-x-2 md:space-x-4">
            {/* {DATA.Level1.map((index) => ( */}
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Top-up Count</p>
                </span>
                <p className="text-sm">{commission.level1Count}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Amount(GHS)</p>
                </span>
                <p className="text-sm">{0}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Comm(GHS)</p>
                </span>
                <p className="text-sm">{commission.level1TotalCommission}</p>
              </div>
            {/* ))} */}
          </div>
        </div>
        <div className="flex flex-col w-full rounded-xl bg-white">
          <div className="flex w-full p-2 bg-[#156064] text-white items-center rounded-t-xl">
            <p className="pl-2">Level 2 Users</p>
          </div>
          <div className="flex items-center justify-between w-full p-4 md:p-6 rounded-xl bg-white space-x-2 md:space-x-4">
            {/* {DATA.Level2.map((index) => ( */}
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Top-up Count</p>
                </span>
                <p className="text-sm">{commission.level2Count}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Amount(GHS)</p>
                </span>
                <p className="text-sm">{0}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Comm(GHS)</p>
                </span>
                <p className="text-sm">{commission.level2TotalCommission}</p>
              </div>
            {/* ))} */}
          </div>
        </div>
        <div className="flex flex-col w-full rounded-xl bg-white">
          <div className="flex w-full p-2 bg-[#156064] text-white items-center rounded-t-xl">
            <p className="pl-2">Level 3 Users</p>
          </div>
          <div className="flex items-center justify-between w-full p-4 md:p-6 rounded-xl bg-white space-x-2 md:space-x-4">
          <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Top-up Count</p>
                </span>
                <p className="text-sm">{commission.level3Count}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Amount(GHS)</p>
                </span>
                <p className="text-sm">{0}</p>
              </div>
              <div
                // key={index}
                className="bg-[#F5F5F5] flex flex-col w-full items-center space-y-1 p-2 md:p-4 rounded-lg md:rounded-xl"
              >
                <span className="text-wrap text-xs md:text-base font-medium">
                  <p>Comm(GHS)</p>
                </span>
                <p className="text-sm">{commission.level3TotalCommission}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharecommission;
