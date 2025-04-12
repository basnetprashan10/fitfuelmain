import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/SessionContext";
import API_URL from "../../../config/apiconfig";
import "./ViewFoodLog.css"; // Your CSS file

const ViewFoodLog = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [foodLogs, setFoodLogs] = useState([]); // Store all logs
  const [mostRecentLog, setMostRecentLog] = useState(null); // Store the most recent log
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(null); // Track which log to show details for

  useEffect(() => {
    if (user) {
      const fetchFoodLog = async () => {
        try {
          const response = await fetch(`${API_URL}/api/foodlog/${user.id}`);
          const data = await response.json();
          setFoodLogs(data); // Set all logs
          if (data.length > 0) {
            setMostRecentLog(data[0]); // The first log is the most recent
          }
        } catch (error) {
          console.error("Error fetching food log:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFoodLog();
    }
  }, [user]); // Only include `user` in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="food-log-page">
      <div className="food-log-container">
        <h2>Your Food Log</h2>
        {mostRecentLog ? (
          <div className="log-entry" key={mostRecentLog._id}>
            <h3>
              Date: {new Date(mostRecentLog.createdAt).toLocaleDateString()}
            </h3>
            <div className="log-details">
              {/* Display summed log */}
              <div className="log-item">
                <h3>Your Today Total Intake</h3>
                <p>
                  <strong>Calories:</strong> {mostRecentLog.summedLog.calories}{" "}
                  kcal
                </p>
                <p>
                  <strong>Protein:</strong> {mostRecentLog.summedLog.protein} g
                </p>
                <p>
                  <strong>Carbs:</strong> {mostRecentLog.summedLog.carbs} g
                </p>
                <p>
                  <strong>Fiber:</strong> {mostRecentLog.summedLog.fiber} g
                </p>
                <p>
                  <strong>Sugar:</strong> {mostRecentLog.summedLog.sugar} g
                </p>
                <p>
                  <strong>Fat:</strong> {mostRecentLog.summedLog.fat} g
                </p>
                <p>
                  <strong>Saturated Fat:</strong>{" "}
                  {mostRecentLog.summedLog.saturatedFat} g
                </p>
                <p>
                  <strong>Cholesterol:</strong>{" "}
                  {mostRecentLog.summedLog.cholesterol} mg
                </p>
                <p>
                  <strong>Sodium:</strong> {mostRecentLog.summedLog.sodium} mg
                </p>
                <p>
                  <strong>Potassium:</strong>{" "}
                  {mostRecentLog.summedLog.potassium} mg
                </p>
                <p>
                  <strong>Vitamin A:</strong> {mostRecentLog.summedLog.vitaminA}{" "}
                  %
                </p>
                <p>
                  <strong>Vitamin C:</strong> {mostRecentLog.summedLog.vitaminC}{" "}
                  %
                </p>
                <p>
                  <strong>Calcium:</strong> {mostRecentLog.summedLog.calcium} mg
                </p>
              </div>

              {/* Show details if "showDetails" matches the current log */}
              {showDetails === mostRecentLog._id && (
                <div className="log-items-detail">
                  <h3>Food Details</h3>
                  {mostRecentLog.log.map((entry, index) => (
                    <div className="log-item" key={index}>
                      <p>
                        <strong>Name:</strong> {entry.name}
                      </p>
                      <p>
                        <strong>Calories:</strong> {entry.calories} kcal
                      </p>
                      <p>
                        <strong>Protein:</strong> {entry.protein} g
                      </p>
                      <p>
                        <strong>Carbs:</strong> {entry.carbs} g
                      </p>
                      <p>
                        <strong>Fiber:</strong> {entry.fiber} g
                      </p>
                      <p>
                        <strong>Sugar:</strong> {entry.sugar} g
                      </p>
                      <p>
                        <strong>Fat:</strong> {entry.fat} g
                      </p>
                      <p>
                        <strong>Saturated Fat:</strong> {entry.saturatedFat} g
                      </p>
                      <p>
                        <strong>Cholesterol:</strong> {entry.cholesterol} mg
                      </p>
                      <p>
                        <strong>Sodium:</strong> {entry.sodium} mg
                      </p>
                      <p>
                        <strong>Potassium:</strong> {entry.potassium} mg
                      </p>
                      <p>
                        <strong>Vitamin A:</strong> {entry.vitaminA} %
                      </p>
                      <p>
                        <strong>Vitamin C:</strong> {entry.vitaminC} %
                      </p>
                      <p>
                        <strong>Calcium:</strong> {entry.calcium} mg
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Button to toggle detailed view */}
              <button
                className="btn-details"
                onClick={() =>
                  setShowDetails(
                    showDetails === mostRecentLog._id ? null : mostRecentLog._id
                  )
                }
              >
                {showDetails === mostRecentLog._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>
          </div>
        ) : (
          <p>No food logs available</p>
        )}
      </div>
    </div>
  );
};

export default ViewFoodLog;
