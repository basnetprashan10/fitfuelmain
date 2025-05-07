import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userauth.css";
import logo from "../../assets/Logo.png";
import API_URL from "../../config/apiconfig";

const UserSignup = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    age: "",
    gender: "",
    role:"",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.fullname.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        password: formData.password,
        role:formData.role
      });
      console.log(response.data);

      setSuccess("Signup successful! Redirecting to login page...");
      setRedirect(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/userlogin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [redirect, navigate]);

  return (
    <div className="loginsignuppage">
      <div className="signup-page">
        <div className="page-header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo2" />
            <p className="slogan2">Where Strength Meets Nutrition</p>
          </div>
        </div>

        <div className="form-wrapper">
          <div className="form-container">
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
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="User">User</option>
                <option value="Trainer">Trainer</option>
                <option value="Seller">Seller</option>
              </select>
              <button type="submit">Signup</button>
            </form>

            <p className="DoAccount">
              Already have an account? <a href="/userlogin">Login</a>
            </p>
          </div>
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

export default UserSignup;
