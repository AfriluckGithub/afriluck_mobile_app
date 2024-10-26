import React from "react";
import Logout from "../components/logout";
import Accounts from "../components/Accounts";

const Profile = () => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-lg">Account Details</h1>
        <Accounts />
      </div>
      <Logout />
    </div>
  );
};

export default Profile;
