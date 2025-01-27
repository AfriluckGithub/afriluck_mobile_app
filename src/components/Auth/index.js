import React, { useMemo } from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useSelector } from "react-redux";

const Auth = () => {

  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  
  return (
    <div>
      {memoizedUser!=null? <LoggedIn /> : <Notlogged />}
    </div>
  );
};

export default Auth;
