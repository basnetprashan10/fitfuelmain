import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/SessionContext";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UserProfile.css";
import API_URL from "../../../config/apiconfig";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const UserProfile = () => {
  const { user: sessionUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    weight: "",
    bmr: "",
    bio: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    if (sessionUser && sessionUser.id) {
      fetch(`${API_URL}/api/signup/getuser/${sessionUser.id}`)
        .then(async (response) => {
          const data = await response.json();
          const userData = data.data;
          setUser({
            fullname: userData.fullname,
            age: userData.age,
            gender: userData.gender,
            weight: userData.weight,
            bmr: userData.bmr,
            bio: userData.bio,
          });
          setFormData({
            fullname: userData.fullname,
            age: userData.age,
            gender: userData.gender,
            weight: userData.weight,
            bmr: userData.bmr,
            bio: userData.bio,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
          setLoading(false);
        });

      // Fetch weight progress data
      fetch(`${API_URL}/api/foodlog/weight-progress/${sessionUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((log, index) => ({
            day: index + 1,
            weight: log.weightProgress,
          }));
          setWeightData(formattedData);
        })
        .catch((error) => {
          console.error("Failed to fetch weight progress data:", error);
        });
    } else {
      setLoading(false);
    }
  }, [sessionUser]);
  const calculateTotalCalories = (foodLog) => {
    let totalCalories = 0;
    foodLog.forEach((log) => {
      totalCalories += log.summedLog.calories;
    });
    setTotalCaloriesConsumed(totalCalories);
  };

  const calculateWeightData = (foodLog) => {
    const bmr = parseFloat(user.bmr);
    const initialWeight = parseFloat(user.weight);
    let currentWeight = initialWeight;
    const data = [];

    foodLog.forEach((log, index) => {
      const caloriesConsumed = log.summedLog.calories;
      const calorieDifference = caloriesConsumed - bmr;
      const weightChange = calorieDifference / 3500; // 3500 calories = 1 pound
      currentWeight += weightChange;

      data.push({
        day: index + 1,
        weight: currentWeight,
      });
    });

    setWeightData(data);
  };

  const handleEditProfile = () => {
    setEditModalOpen(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.bmr &&
      (isNaN(formData.bmr) || parseFloat(formData.bmr) <= 0)
    ) {
      setErrorMessage("BMR must be a positive number.");
      return;
    }

    fetch(`${API_URL}/api/signup/edituser/${sessionUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setUser({ ...user, ...formData });
          setSuccessMessage("Profile updated successfully!");
          setTimeout(() => {
            setEditModalOpen(false);
            setSuccessMessage("");
          }, 500);
        } else {
          setErrorMessage(
            data.message || "Failed to update profile. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Failed to update user details:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  if (!sessionUser) {
    if (!showPopup) {
      setShowPopup(true);
      setTimeout(() => {
        navigate("/userlogin");
      }, 2000);
    }

    return (
      <div>
        {showPopup && (
          <div className="popup-message">
            <p>You are not logged in. Redirecting to login...</p>
          </div>
        )}
        <div>Loading...</div>
      </div>
    );
  }

  // if (loading) {
  //   return <div>Loading user details...</div>;
  // }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="profile-page-container">
      {/* Profile Card */}
      <div className="profile-container">
        <section className="profile-header">
          <div className="avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="profile-avatar"
              />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="5x" />
            )}
          </div>
          <div className="profile-info">
            <h2>{user.fullname}</h2>
            <p>{user.username}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>My BMR: {user.bmr}</p>
            <p>Weight: {user.weight}</p>
            <button
              onClick={handleEditProfile}
              className="edit-profile-button2"
            >
              Edit Profile
            </button>
          </div>
        </section>

        <section className="profile-bio">
          <h3>Bio</h3>
          <p>{user.bio || "No bio available"}</p>
        </section>
      </div>

      {/* Chart Card */}
      <div className="chart-container">
        <h3>Weight Progress</h3>
        <LineChart
          width={600}
          height={300}
          data={weightData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="modal-overlay2">
          <div className="modal-content2">
            <h2>Edit Profile</h2>
            {errorMessage && <p className="error-message2">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message2">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Weight:
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                BMR:
                <input
                  type="number"
                  name="bmr"
                  value={formData.bmr}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
