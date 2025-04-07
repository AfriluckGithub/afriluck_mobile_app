import React from "react";
import { AccountSecurityData } from "../../data/accountsecurity";
import { NavLink } from "react-router-dom";
import Subheader from "../subheader";
import { useNavigate } from "react-router-dom";

// const user = useSelector((state) => state.user.user);

// const memoizedUser = useMemo(() => {
//   return user ? { ...user } : null;
// }, [user]);

const AccountSecurity = () => {
  const navigate = useNavigate();
  // const requestBody = {
  //   phone_number: '',
  //   otp : ''
  // };
  // const verifyOTP = fetch('', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: requestBody
  // });
  return (
    <div className="flex flex-col  h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Account Security" />
      {/* <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
        {AccountSecurityData.map((account, index) => (
          <NavLink
            key={index}
            className="flex items-center justify-between py-4 "
            to={account.route}
          >
            <div className="flex items-center space-x-2">
              <img src={account.img} alt={account.title} className="w-6 h-6 " />
              <span className="font-medium text-md">{account.title}</span>
            </div>
            <img src={"chevronr.svg"} alt="" />
          </NavLink>
        ))}
      </div> */}
      <div
        className="flex items-center justify-between py-6 px-6 bg-white rounded-xl border border-border-default"
        onClick={() => navigate("/deleteaccount")}
      >
        <div className="flex items-center space-x-2">
          <img src={"trash.svg"} alt="trash" className="w-6 h-6 " />
          <span className="font-semibold text-md text-[#FF0000]">
            Delete Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
