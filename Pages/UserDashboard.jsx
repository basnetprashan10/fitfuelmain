import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCalculator, faAppleAlt, faDumbbell, faTachometerAlt, faBullseye, faUtensils, faCogs, faUserTag } from '@fortawesome/free-solid-svg-icons';
import logo from './Logo.png'; 
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section (Logo, Title, and User Profile) */}
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="FitFuel Logo" className="logo" />
          </div>
          <div className="title-container">
            <h1>FitFuel</h1>
            <p className="slogan">Where Strength Meets Nutrition</p>
          </div>
          <div className="user-profile">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            <p className="username">Username</p>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="dashboard-main">
        <div className="box-container">
          <div className="box">
            <h3>BMR</h3>
            <FontAwesomeIcon icon={faCalculator} className="icon" />
            <p>Calculate BMR</p>
          </div>
          <div className="box">
            <h3>Foods</h3>
            <FontAwesomeIcon icon={faAppleAlt} className="icon" />
            <p>Calculate your Calories, Micros and Macros</p>
          </div>
          <div className="box">
            <h3>Resistance Training</h3>
            <FontAwesomeIcon icon={faDumbbell} className="icon" />
            <p>Track your resistance training</p>
          </div>
        </div>
      </section>

      {/* Navbar Section */}
      <nav className="dashboard-nav">
        <ul>
          <li className="active"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
          <li><FontAwesomeIcon icon={faBullseye} /> Aim</li>
          <li><FontAwesomeIcon icon={faUtensils} /> Kitchen</li>
          <li><FontAwesomeIcon icon={faCogs} /> Settings</li>
          <li><FontAwesomeIcon icon={faUserTag} /> Agent</li>
        </ul>
      </nav>
    </div>
  );
};

export default UserDashboard;
