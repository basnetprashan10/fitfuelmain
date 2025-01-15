import React from 'react';
import './UserSignup.css';
import logo from './Logo.png';

const UserSignup = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="form-container">
        <h1>FitFuel</h1>
        <p className="slogan">FitFuel: Where Strength Meets Nutrition</p>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="number" placeholder="Age" required />
          <select required>
            <option value="" disabled selected>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="password" placeholder="Password" required />
          <button type="submit">Signup</button>
        </form>
        <p className="DoAccount">
          Already have an account? <a href="/">Login</a>
        </p >
        <div className="footer-text">&copy; 2025 FitFuel. All rights reserved.</div>
      </div>
    </div>
  );
};

export default UserSignup;
