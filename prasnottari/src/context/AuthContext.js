import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check local storage or session storage for authentication info
    const storedUserId = localStorage.getItem("userId");
    console.log("Session : " + storedUserId);
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);
  const login = async (loginData) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/login",
        loginData
      );
      if (res.data.userId) {
        setIsLoggedIn(true);
        setUserId(res.data.userId);
        localStorage.setItem("userId", res.data.userId);
        navigate("/");
      }
    } catch (err) {
      // Throw the error to be handled in the LoginForm
      throw err.response.data; // This will pass the error message to the caller
    }
  };

  
  const signup = async (signUpData) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/signup",
        signUpData
      );
      // console.log(res.statusCode);
      // if (res.statusCode === 200) {
      console.log(res.data);
      alert("Sign-up successful! You can now log in.");
      //   navigate("/"); // Redirect to login page
      // // }
      login({ email: signUpData.email, password: signUpData.password });
    } catch (err) {
      console.error("Sign-up failed:", err);
      throw err.response.data;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
