import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./edituser.css";
// Import SlideMenu component for side navigation
import SlideMenu from "../../../components/slidemenu";
// Import API_URL for API endpoints
import API_URL from "../../../config/apiconfig";

const EditUser = ({ users = [], setUsers = () => {} }) => {
  const navigate = useNavigate(); // Navigate to other routes
  const location = useLocation(); // Get the current location
  // Retrieve user data passed through location state
  const userDataFromState = location.state?.user;

  // Initialize state with user data or default values
  const [userData, setUserData] = useState({
    _id: userDataFromState?._id || "",
    username: userDataFromState?.username || "",
    email: userDataFromState?.email || "",
    fullname: userDataFromState?.fullname || "",
    age: userDataFromState?.age || "",
    gender: userDataFromState?.gender || "",
    user_type: userDataFromState?.user_type || "",
    bio: userDataFromState?.bio || "",
  });

  // Update state when user data changes (initial load)
  useEffect(() => {
    if (userDataFromState) {
      setUserData(userDataFromState);
    }
  }, [userDataFromState]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission (user update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to update user information
      const response = await fetch(
        `${API_URL}/api/signup/edituser/${userData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      // Update users list if setUsers function is available
      if (setUsers && typeof setUsers === "function") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser.data._id ? updatedUser.data : user
          )
        );
      }

      alert("User updated successfully!"); // Show success message
      navigate("/manageusers"); // Redirect to manage users page
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user. Please try again.");
    }
  };

  return (
    <>
      <SlideMenu /> {/* Display side menu */}
      <div className="edit-user-container">
        <h1 className="edit-user-title">Edit User</h1>
        <form className="edit-user-form" onSubmit={handleSubmit}>
          {/* Form fields for user data */}
          <label>
            Full Name
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={userData.fullname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={userData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Gender
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            User Type
            <select
              name="user_type"
              value={userData.user_type}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
              <option value="Trainer">Trainer</option>
            </select>
          </label>

          {/* Conditionally render bio field for Trainer */}
          {userData.user_type === "Trainer" && (
            <label>
              Bio
              <textarea
                name="bio"
                placeholder="Enter trainer bio"
                value={userData.bio}
                onChange={handleChange}
                required
                rows="4"
              />
            </label>
          )}

          <button type="submit" className="submit-button">
            Update User
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
