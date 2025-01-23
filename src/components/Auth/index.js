import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";
import { useAuth } from "../../context/AuthContext";

const Auth = () => {
  const { isLoggedIn, toggleLogin } = useAuth(); // Access the auth context
  // const loggedIn = localStorage.getItem("logged_in");
  return (
    <div>
      {isLoggedIn ? <LoggedIn /> : <Notlogged />}
      {/* {<button onClick={toggleLogin}>{isLoggedIn ? "Log Out" : "Log In"}</button>} */}
    </div>
  );
};

export default Auth;
