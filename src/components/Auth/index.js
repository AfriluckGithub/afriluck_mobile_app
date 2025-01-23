import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Auth = () => {

  const user = useSelector((state) => state.user.user);
  
  return (
    <div>
      {user!=null? <LoggedIn /> : <Notlogged />}
    </div>
  );
};

export default Auth;
