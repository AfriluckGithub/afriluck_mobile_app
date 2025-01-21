import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const Auth = () => {
  const { isLoggedIn, toggleLogin } = useAuth(); // Access the auth context
  const loggedIn = localStorage.getItem("logged_in");
  return (
    <div>
      {loggedIn ? <LoggedIn /> : <Notlogged />}
      <button onClick={toggleLogin}>{isLoggedIn ? "Log Out" : "Log In"}</button>
    </div>
  );
};

export default Auth;
