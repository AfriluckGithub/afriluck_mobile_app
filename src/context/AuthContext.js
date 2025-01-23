import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const toggleLogout = () => {
    setIsLoggedIn(false);
  };

  const setCurrentUser = (user) => {
    setAuthUser(user);
  };

  const clearCurrentUser = () => {
    setAuthUser(null);
  };

  const values = {
    setCurrentUser,
    clearCurrentUser,
    isLoggedIn,
    authUser,
    toggleLogin,
  };

  console.log(toggleLogout);
  

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
