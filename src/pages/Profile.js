import React from "react";
import Logout from "../components/logout";
import Accounts from "../components/Accounts";
import Privacy from "../components/Privacy";
import Share from "../components/Share";
import Auth from "../components/Auth";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex flex-col w-full h-[1400px] space-y-6 px-6 py-8 mt-16">
      <div className="space-y-2">
        <Auth />
      </div>
      <div className="space-y-2">
        {user ? <h1 className="text-lg">Account Details</h1> : <p></p>}
        {user ? <Accounts /> : <p></p>}
      </div>
      <div className="space-y-2">
        <h1 className="text-lg">Share Activity</h1>
        <Share />
      </div>
      <div className="space-y-2">
        <h1 className="text-lg">Privacy Data</h1>
        <Privacy />
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
