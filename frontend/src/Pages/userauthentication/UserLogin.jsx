import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/apiconfig";
import AuthContext from "../../context/SessionContext"; // Import AuthContext
import "./userauth.css";
import logo from "../../assets/Logo.png";

const UserLogin = () => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { updateUserFromToken } = useContext(AuthContext); // Get function and user from context
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginInput, password }),
      });

      const data = await response.json();

      // Debugging line: log user type
      if (data && data.user) {
        console.log("User Type:", data.user.user_type); // Correctly access user_type
      }

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        updateUserFromToken(data.token); // Update the user context after login
        setSuccessMessage("Login successful! Redirecting...");

        // Redirect based on user type after a delay
        setTimeout(() => {
          switch (data.user.user_type) {
            case "Admin":
              navigate("/admindashboard");
              break;
            case "Seller":
              navigate("/sellerdashboard");
              break;
            case "Trainer":
              navigate("/userdashboard");
              break;
            case "User":
            default:
              navigate("/userdashboard");
              break;
          }
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setError("Server error, try again later");
    }
  };

  return (
    <div className="loginsignuppage">
      <div className="login-page">
        <div className="page-header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo2" />
            <p className="slogan2">Where Strength Meets Nutrition</p>
          </div>
        </div>

        <div className="form-container">
          <h1>User Login</h1>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username or Email"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="DoAccount">
            New user? <a href="/usersignup">Sign Up</a>
          </p>
        </div>
        <div className="footer">
          <div className="footer-text">
            &copy; {currentYear} FitFuel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
