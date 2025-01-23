import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useAuth } from "../../context/AuthContext";

const Auth = () => {
  const { 
    setCurrentUser, 
    clearCurrentUser,
    isLoggedIn,
    authUser,
    toggleLogin 
  } = useAuth();

  console.log("Logged in => ", isLoggedIn);

  // localStorage.setItem("loggedIn", isLoggedIn);
  
  return (
    <div>
      {isLoggedIn ? <LoggedIn /> : <Notlogged />}
      { <button onClick={toggleLogin}>{isLoggedIn ? "Log Out" : "Log In"}</button>}
    </div>
  );
};

export default Auth;
