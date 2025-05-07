import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faTachometerAlt,
  faBullseye,
  faUtensils,
  faShoppingCart,
  faChalkboardTeacher,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import AuthContext from "../context/SessionContext";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleSettingsPopup = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (isPopupOpen) {
      togglePopup(); // Close the main popup if it's open
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    setUser(null); // Clear user context
    navigate("/userlogin"); // Redirect to login page
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isPopupOpen) {
      togglePopup(); // Close the popup if it is open
    }
  };

  return (
    <>
      {/* Floating Button for Small Screens */}
      <button className="nav-toggle-btn" onClick={togglePopup}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Navigation Bar (Visible on Larger Screens) */}
      <nav className="dashboard-nav">
        <ul>
          <li
            className="active"
            onClick={() => handleNavigation("/userdashboard")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => handleNavigation("/buy-essential")}>
            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
            <span>Buy Essential</span>
          </li>
          <li onClick={() => handleNavigation("/aim")}>
            <FontAwesomeIcon icon={faBullseye} className="nav-icon" />
            <span>Aim</span>
          </li>
          <li onClick={() => handleNavigation("/kitchen")}>
            <FontAwesomeIcon icon={faUtensils} className="nav-icon" />
            <span>Kitchen</span>
          </li>

          {/* Conditionally Render Hire Request link */}
          {user?.user_type !== "User" && (
            <li onClick={() => handleNavigation("/hirerequest")}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="nav-icon"
              />
              <span>Hire Request</span>
            </li>
          )}

          {/* Conditionally Render Hire Trainer link */}
          {user?.user_type !== "Trainer" && (
            <li onClick={() => handleNavigation("/hire-trainer")}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="nav-icon"
              />
              <span>Hire Trainer</span>
            </li>
          )}

          <li onClick={toggleSettingsPopup}>
            <FontAwesomeIcon icon={faBars} className="nav-icon" />
          </li>
        </ul>
      </nav>

      {/* Popup Modal for Small Screens */}
      <div className={`nav-popup ${isPopupOpen ? "active" : ""}`}>
        <div className="nav-popup-content">
          <button className="close-popup" onClick={togglePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul>
            <li
              className="active"
              onClick={() => handleNavigation("/userdashboard")}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li onClick={() => handleNavigation("/buy-essential")}>
              <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
              <span>Buy Essential</span>
            </li>
            <li onClick={() => handleNavigation("/aim")}>
              <FontAwesomeIcon icon={faBullseye} className="nav-icon" />
              <span>Aim</span>
            </li>
            <li onClick={() => handleNavigation("/kitchen")}>
              <FontAwesomeIcon icon={faUtensils} className="nav-icon" />
              <span>Kitchen</span>
            </li>

            {/* Conditionally Render Hire Request link */}
            {user?.user_type !== "User" && (
              <li onClick={() => handleNavigation("/hirerequest")}>
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="nav-icon"
                />
                <span>Hire Request</span>
              </li>
            )}

            {/* Conditionally Render Hire Trainer link */}
            {user?.user_type !== "Trainer" && (
              <li onClick={() => handleNavigation("/hire-trainer")}>
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="nav-icon"
                />
                <span>Hire Trainer</span>
              </li>
            )}

            <li onClick={toggleSettingsPopup}>
              <FontAwesomeIcon icon={faBars} className="nav-icon" />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Settings Popup */}
      <div className={`settings-popup ${isSettingsOpen ? "active" : ""}`}>
        <div className="settings-popup-content">
          <button className="close-popup" onClick={toggleSettingsPopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3>Settings</h3>
          <ul>
            <li onClick={() => handleNavigation("/userprofile")}>Profile</li>
            <li onClick={handleLogout}>Logout</li>

            {/* Add more options here if needed */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
