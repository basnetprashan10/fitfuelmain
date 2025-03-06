import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <div className="logo-containerr">
          <img src={logo} alt="FitFuel Logo" className="logo" />
        </div>
        <div className="title-container">
          <h1>FitFuel</h1>
          <p className="slogan">Where Strength Meets Nutrition</p>
        </div>
        <div className="user-profile">
          <div className="user-profile-contaainer">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            <p className="username">Username</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
