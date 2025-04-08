import React from "react";
import { PolicyData } from "../../data/policy";
import Subheader from "../subheader";

const Terms = () => {
  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Terms and Conditions" />
      <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
        <a className="flex w-full justify-center items-center" href="https://afriluck.com/page-detail/terms-and-conditions">
        https://afriluck.com/page-detail/terms-and-conditions
        </a>
      </div>
      {/* {PolicyData.map((policy, index) => (
        <div
          key={index}
          className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default"
        >
          <p>{policy.description}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Terms;
