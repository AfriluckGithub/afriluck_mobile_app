import React from "react";
import Notlogged from "./notlogged";
import LoggedIn from "./loggedin";

const Auth = () => {
  return (
    <div>
      <Notlogged />
      <LoggedIn />
    </div>
  );
};

export default Auth;
