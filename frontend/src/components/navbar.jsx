import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import {
  faTachometerAlt,
  faBullseye,
  faUtensils,
  faCogs,
  faShoppingCart,
  faChalkboardTeacher,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Use navigate instead of history.push
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
          <li onClick={() => handleNavigation("/hire-trainer")}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="nav-icon" />
            <span>Hire Trainer</span>
          </li>
          <li onClick={() => handleNavigation("/settings")}>
            <FontAwesomeIcon icon={faCogs} className="nav-icon" />
            <span>Settings</span>
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
            <li onClick={() => handleNavigation("/hire-trainer")}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="nav-icon"
              />
              <span>Hire Trainer</span>
            </li>
            <li onClick={() => handleNavigation("/settings")}>
              <FontAwesomeIcon icon={faCogs} className="nav-icon" />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
