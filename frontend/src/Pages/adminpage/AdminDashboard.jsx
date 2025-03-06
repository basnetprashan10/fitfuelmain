import React from "react";
import "./AdminDashboard.css";
import SlideMenu from "../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTie,
  faStore,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <SlideMenu />
      <div className="main-content">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <section className="dashboard">
          <div className="card">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <h3>Total Users</h3>
            <p>150</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faUserTie} className="icon" />
            <h3>Total Trainers</h3>
            <p>5</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faStore} className="icon" />
            <h3>Total Sellers</h3>
            <p>5</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faHourglassHalf} className="icon" />
            <h3>Pending Approvals</h3>
            <p>5</p>
          </div>
          
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
