import React, { useMemo } from "react";
import Logout from "../components/logout";
import Accounts from "../components/Accounts";
import Privacy from "../components/Privacy";
import Share from "../components/Share";
import Auth from "../components/Auth";
import { useSelector } from "react-redux";



const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  window.scrollTo(0, 0);
  return (
    <div className="flex flex-col h-[770px]  my-32 space-y-6 mx-4 md:mx-12 lg:mx-48">
      <div className="space-y-6">
        <div className="space-y-4 ">
          <Auth />
        </div>
        <div className="space-y-4">
          {memoizedUser ? (
            <h1 className="text-lg">Account Details</h1>
          ) : (
            <p></p>
          )}
          {memoizedUser ? <Accounts /> : <p></p>}
        </div>
        <div className="space-y-4">
          <h1 className="text-lg">Share Activity</h1>
          <Share />
        </div>
        <div className="space-y-4">
          <h1 className="text-lg">Privacy Data</h1>
          <Privacy />
        </div>
        <div>{memoizedUser ? <Logout /> : <p></p>}</div>
      </div>
    </div>
  );
};

export default Profile;
