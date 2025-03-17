import React, { createContext, useState, useEffect, useRef } from "react";

// Create AuthContext to provide authentication-related data across the app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state for user data
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token and set user data
        const userData = JSON.parse(atob(token.split(".")[1]));
        return {
          id: userData.id,
          username: userData.username,
          fullname: userData.fullname,
          user_type: userData.user_type,
        };
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null; // Return null if no token is found
  });

  const initialized = useRef(false); // Flag to track initialization

  // Function to update user from token
  const updateUserFromToken = (token) => {
    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage
      try {
        // Decode token and update user state
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: userData.id,
          username: userData.username,
          user_type: userData.user_type,
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null); // Reset user if decoding fails
      }
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true; // Mark as initialized to avoid running multiple times
      const token = localStorage.getItem("token");
      if (token) {
        updateUserFromToken(token); // Update user if token is present
      }
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <AuthContext.Provider value={{ user, setUser, updateUserFromToken }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
