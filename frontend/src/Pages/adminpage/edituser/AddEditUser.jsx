import React, { useState, useEffect } from "react";
import "./edituser.css";
import SlideMenu from "../../../components/slidemenu";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../../config/apiconfig";

const EditUser = ({ users = [], setUsers = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDataFromState = location.state?.user;

  const [userData, setUserData] = useState({
    _id: userDataFromState?._id || "",
    username: userDataFromState?.username || "",
    email: userDataFromState?.email || "",
    fullname: userDataFromState?.fullname || "",
    age: userDataFromState?.age || "",
    gender: userDataFromState?.gender || "",
    user_type: userDataFromState?.user_type || "",
  });

  useEffect(() => {
    if (userDataFromState) {
      setUserData(userDataFromState);
    }
  }, [userDataFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

      // Ensure setUsers is available before calling it
      if (setUsers && typeof setUsers === "function") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser.data._id ? updatedUser.data : user
          )
        );
      }

      alert("User updated successfully!"); // Visual confirmation
      navigate("/manageusers"); // Ensure navigation happens after updating
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user. Please try again.");
    }
  };

  return (
    <div className="edit-user-container">
      <SlideMenu />
      <h1 className="edit-user-title">Edit User</h1>
      <form className="edit-user-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
