import React, { useEffect, useState } from "react";
import "./SellerDashboard.css";
import SlideMenu from "../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faBan,
  faCheckCircle,
  faCog,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../config/apiconfig";

const SellerDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/status/count`);
        const data = await response.json();

        if (data) {
          // Set the state based on the API response
          setShipped(data.shipped);
          setCanceled(data.canceled);
          setDelivered(data.delivered);
          setProcessing(data.processing);
          setPending(data.pending);

          // Calculate the total number of orders
          setTotalOrders(
            data.shipped +
              data.canceled +
              data.delivered +
              data.processing +
              data.pending
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="seller-container">
      <SlideMenu />
      <div className="main-content">
        <h1 className="dashboard-title">Seller Dashboard</h1>
        <section className="dashboard">
          <div className="card">
            <FontAwesomeIcon icon={faShippingFast} className="icon" />
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <h3>Shipped</h3>
            <p>{shipped}</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faBan} className="icon" />
            <h3>Canceled</h3>
            <p>{canceled}</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <h3>Delivered</h3>
            <p>{delivered}</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faCog} className="icon" />
            <h3>Processing</h3>
            <p>{processing}</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faHourglassHalf} className="icon" />
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
