import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/apiconfig";
import "./userauth.css";
import logo from "../../assets/Logo.png";

const UserLogin = () => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
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

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        // Navigate based on user role
        switch (data.role) {
          case "admin":
            navigate("/admindashboard");
            break;
          case "seller":
            navigate("/sellerdashboard");
            break;
          case "trainer":
            navigate("/trainedashboard");
            break;
          case "user":
          default:
            navigate("/userdashboard");
            break;
        }
      }
    } catch (err) {
      setError("Server error, try again later");
    }
  };

  return (
    <div className="login-page">
      <div className="page-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo2" />
          <p className="slogan2">Where Strength Meets Nutrition</p>
        </div>
      </div>

      <div className="form-container">
        <div className="icon-container">
          <FontAwesomeIcon icon={faUser} size="4x" />
        </div>
        <h1>User Login</h1>
        {error && <p className="error-message">{error}</p>}
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
  );
};

export default UserLogin;
