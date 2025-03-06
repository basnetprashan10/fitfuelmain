import React, { useState, useEffect } from "react";
import "./managerusers.css";
import SlideMenu from "../../../components/slidemenu";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../config/apiconfig";
import Modal from "../../../components/dialogModal/Modal"; // Import the modal component

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/signup/getuser`);
        const data = await response.json();

        if (data.message === "success") {
          const formattedUsers = data.data.map((user) => ({
            ...user,
            type: user.user_type || "User",
          }));
          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const confirmDeleteUser = (id) => {
    setSelectedUserId(id);
    setModalOpen(true);
  };
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

  const deleteUser = async () => {
    setModalOpen(false);
    if (!selectedUserId) return;

    try {
      const response = await fetch(
        `${API_URL}/api/signup/deleteuser/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUserId)
        );
        setSuccessOpen(true);
      } else if (response.status === 404) {
        alert("User not found.");
      } else {
        alert("Failed to delete user.");
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
              onChange={(e) => setFilter(e.target.value)}
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
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="users-list">
          {groupUserByType(filter).length === 0 ? (
            <p>No user found.</p>
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
                        onClick={() => confirmDeleteUser(user._id)}
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
        onConfirm={deleteUser}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Message Modal */}
      <Modal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Success"
        message="User deleted successfully."
        confirmText="OK"
      />
    </div>
  );
};

export default ManageUsers;
