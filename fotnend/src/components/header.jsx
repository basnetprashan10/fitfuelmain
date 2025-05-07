import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";
import "./header.css";
import AuthContext from "../context/SessionContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo-container">
          <img src={logo} alt="FitFuel Logo" className="header-logo" />
        </div>
        <div className="header-title-container">
          <h1 className="header-title">FitFuel</h1>
          <p className="header-slogan">Where Strength Meets Nutrition</p>
        </div>
        <div className="header-user-profile">
          <div className="header-user-profile-container">
            <FontAwesomeIcon icon={faUserCircle} className="header-user-icon" />
            <p className="header-username">
              {user ? user.username : "Guest"}
            </p>{" "}
            {/* Display username or 'Guest' */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
