import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./userauth.css";
import logo from "../../assets/Logo.png";
import API_URL from "../../config/apiconfig";

const UserSignup = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log("API URL:", API_URL);

    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        password: formData.password,
      });
      console.log(response.data); // Log response from server
      


      setSuccess("Signup successful! You can now log in.");
      setFormData({
        fullname: "",
        username: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
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
        <h1>User Signup</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>

        <p className="DoAccount">
          Already have an account? <a href="/userlogin">Login</a>
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

export default UserSignup;
