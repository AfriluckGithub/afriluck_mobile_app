import React, { useEffect, useMemo } from "react";
import Logout from "../components/logout";
import Accounts from "../components/Accounts";
import Privacy from "../components/Privacy";
import Share from "../components/Share";
import Auth from "../components/Auth";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  window.scrollTo(0, 0);
  const containerHeight = memoizedUser
    ? "lg:h-[1200px] sm:h-[800px]"
    : "lg:h-[800px] sm:h-[800px]";

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch(
          "https://app-api.afriluck.com/api/V1/app/account/balance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${memoizedUser?.token}`,
            },
          }
        );
        const json = await response.json();
        if (response.status === 200) {
          console.log("Balance => ", json.balance);
          dispatch(update({ balance: json.balance }));
        } else if (response.status === 401) {
          console.log("Session expired, please login again");
        } else {
          console.log("Error fetching balance");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    getBalance();
  }, [dispatch, memoizedUser]);
  return (
    <div
      className={`flex flex-col ${containerHeight} sm:h-[800px] my-32 space-y-6 mx-4 md:mx-12 lg:mx-48`}
    >
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
        <div className="space-y-4">{memoizedUser ? <Logout /> : <p></p>}</div>
      </div>
    </div>
  );
};

export default Profile;
