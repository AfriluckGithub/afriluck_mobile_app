import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const Auth = () => {
  const { isLoggedIn, toggleLogin } = useAuth(); // Access the auth context

  return (
    <div>
      {isLoggedIn ? <LoggedIn /> : <Notlogged />}
      <button onClick={toggleLogin}>{isLoggedIn ? "Log Out" : "Log In"}</button>
    </div>
  );
};

export default Auth;
