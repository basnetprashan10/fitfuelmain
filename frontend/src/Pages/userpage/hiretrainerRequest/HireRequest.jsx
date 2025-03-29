import React, { useState, useEffect, useContext } from "react";
import API_URL from "../../../config/apiconfig";
import AuthContext from "../../../context/SessionContext";
import axios from "axios";
import "./HireRequest.css";

const HireRequest = () => {
  const { user } = useContext(AuthContext);
  const [hireRequests, setHireRequests] = useState([]);

  useEffect(() => {
    const fetchHireRequests = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${API_URL}/api/hire-trainer/${user.id}`
          );
          const pendingRequests = response.data.data.filter(
            (request) => request.status === "Pending"
          );
          setHireRequests(pendingRequests);
        } catch (error) {
          console.error("Error fetching hire requests", error);
        }
      }
    };

    fetchHireRequests();
  }, [user]); // Dependency array with 'user'

  const handleStatusChange = async (requestId, status) => {
    try {
      await axios.patch(`${API_URL}/api/hire-trainer/status/${requestId}`, {
        status,
      });
      setHireRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error("Error updating hire request status", error);
    }
  };

  return (
    <div className="hire-request-view-page">
      <div className="hire-request-view">
        <h1>Hire Requests</h1>
        <div className="request-list">
          {hireRequests.length > 0 ? (
            hireRequests.map((request) => (
              <div key={request._id} className="request-box">
                <h3>{request.userId.fullname}</h3>
                <p>{request.userId.email}</p>
                <p>{request.userId.gender}</p>
                <p>Age: {request.userId.age} Yr</p>
                <p>Status: {request.status}</p>
                <div className="btn-container">
                  <button
                    onClick={() => handleStatusChange(request._id, "Accepted")}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(request._id, "Rejected")}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hire requests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default HireRequest;
