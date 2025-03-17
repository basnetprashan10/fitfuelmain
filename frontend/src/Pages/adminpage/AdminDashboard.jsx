import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import SlideMenu from "../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserTie, faStore } from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../config/apiconfig";

const AdminDashboard = () => {
  // State to store total users, trainers, and sellers
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);

  useEffect(() => {
    // Fetch the data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/signup/usercount`);
        const data = await response.json();

        if (data.message === "success") {
          // Update state with the fetched data
          setTotalUsers(data.data.totalUsers);
          setTotalTrainers(data.data.totalTrainers);
          setTotalSellers(data.data.totalSellers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SlideMenu />
      <div className="admin-container">
        <div className="main-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <section className="dashboard">
            {/* Card to display total users */}
            <div className="card">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
            {/* Card to display total trainers */}
            <div className="card">
              <FontAwesomeIcon icon={faUserTie} className="icon" />
              <h3>Total Trainers</h3>
              <p>{totalTrainers}</p>
            </div>
            {/* Card to display total sellers */}
            <div className="card">
              <FontAwesomeIcon icon={faStore} className="icon" />
              <h3>Total Sellers</h3>
              <p>{totalSellers}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
