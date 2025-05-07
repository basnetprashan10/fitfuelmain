import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./managerusers.css";
import SlideMenu from "../../../components/slidemenu";
import API_URL from "../../../config/apiconfig";
// Import the modal component for confirmation and success messages
import Modal from "../../../components/dialogModal/Modal";

const ManageUsers = () => {
  // State to store users, filter, search input, and modal states
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/signup/getalluser`);
        const data = await response.json();

        if (data.message === "success") {
          const formattedUsers = data.data.map((user) => ({
            ...user,
            type: user.user_type || "User", // Set default type as 'User' if not provided
          }));
          setUsers(formattedUsers); // Update users state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Opens the confirmation modal for deleting a user
  const confirmDeleteUser = (id) => {
    setSelectedUserId(id); // Set the selected user ID to delete
    setModalOpen(true); // Open the confirmation modal
  };

  // Filters users by type and search query
  const groupUserByType = (userType) => {
    if (!Array.isArray(users)) {
      console.error("Users is not an array:", users);
      return [];
    }

    return users
      .filter((user) => (userType ? user.user_type === userType : true))
      .filter((user) =>
        search
          ? user.username.toLowerCase().includes(search.toLowerCase())
          : true
      );
  };

  // Delete user from the database
  const deleteUser = async () => {
    setModalOpen(false); // Close modal after deletion attempt
    if (!selectedUserId) return;

    try {
      const response = await fetch(
        `${API_URL}/api/signup/deleteuser/${selectedUserId}`,
        {
          method: "DELETE", // Make DELETE request to remove user
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUserId)
        );
        setSuccessOpen(true); // Open success modal if deletion is successful
      } else if (response.status === 404) {
        alert("User not found."); // Alert if user is not found
      } else {
        alert("Failed to delete user."); // Alert if deletion fails
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <div className="manage-users-container">
      <SlideMenu />
      <div className="header-container">
        <h1 className="header-container-title">Manage Users</h1>
      </div>
      <div className="list-container">
        <div className="listhead-container">
          <h3>User List</h3>
          <div className="listhead-filter">
            <select
              className="filter-opt"
              value={filter}
              onChange={(e) => setFilter(e.target.value)} // Handle filter change
            >
              <option value="">All</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
              <option value="Trainer">Trainer</option>
            </select>
            <input
              type="text"
              placeholder="Search by username"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Handle search input change
              className="search-input"
            />
          </div>
        </div>

        <div className="users-list">
          {groupUserByType(filter).length === 0 ? (
            <p>No user found.</p> // Display message if no users match the filter
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>User Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupUserByType(filter).map((user) => (
                  <tr key={user._id}>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.type}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(`/edituser/${user._id}`, { state: { user } })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => confirmDeleteUser(user._id)} // Handle user deletion
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteUser} // Confirm deletion action
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Message Modal */}
      <Modal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)} // Close success modal
        title="Success"
        message="User deleted successfully."
        confirmText="OK"
      />
    </div>
  );
};

export default ManageUsers;
