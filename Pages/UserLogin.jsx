import React from 'react';
import './UserLogin.css';
import logo from './Logo.png'; 

const UserLogin = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="FitFuel Logo - User Login" className="logo" />
      </div>
      <div className="form-container">
        <h1>FitFuel</h1>
        <p className="slogan">FitFuel: Where Strength Meets Nutrition</p>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="NoAccount">
          Don't have an account? <a href="UserSignup">Signup</a>
        </p>
        <div className="footer-text">&copy; 2025 FitFuel. All rights reserved.</div>
      </div>
    </div>
  );
};

export default UserLogin;
