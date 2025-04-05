import React, { useMemo, Suspense, lazy } from "react";
//import Notlogged from "./notlogged";
//import LoggedIn from "./loggedin";
import { useSelector } from "react-redux";

const LoggedIn = lazy(() => import("./loggedin"));
const Notlogged = lazy(() => import("./notlogged"));

const Auth = () => {
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  

  return (
    <div>
      {memoizedUser?.verifiedUser === true && memoizedUser? (
        <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
          <LoggedIn />
        </Suspense>
      ) : (
        <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
          <Notlogged />
        </Suspense>
      )}
    </div>
  );
};

export default Auth;
