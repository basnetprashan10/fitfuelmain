import React, { useState, useEffect } from "react";
import "./manageCategory.css"; // Updated to use the same styles as ManageProducts
import SlideMenu from "../../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../config/apiconfig";
import Modal from "../../../components/dialogModal/Modal";
import axios from "axios";

const ManageExerciseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/exercisecategory`);
        const updatedCategories = response.data.map((category) => ({
          ...category,
          img: category.img.startsWith("http")
            ? category.img
            : `${API_URL}${category.img}`,
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteCategory = async () => {
    if (categoryIdToDelete) {
      try {
        await axios.delete(
          `${API_URL}/api/exercisecategory/${categoryIdToDelete}`
        );
        setCategories(
          categories.filter((cat) => cat._id !== categoryIdToDelete)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsConfirmOpen(false);
        setCategoryIdToDelete(null);
      }
    }
  };

  return (
    <div className="manage-exercise-categories-container">
      <SlideMenu />
      <div className="header-container11">
        <h1 className="header-title11">Manage Exercise Categories</h1>
        <div className="add-category-button">
          <button onClick={() => navigate("/addeditexercisecategory")}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Category
          </button>
        </div>
      </div>
      <div className="list-container">
        <div className="list-title">
          <h3>Exercise Category List</h3>
        </div>
        <div className="category-list">
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>
                      <img
                        src={category.img}
                        alt={category.name}
                        className="category-image"
                      />
                    </td>
                    <td>
                      <button
                        className="edit-category-button"
                        onClick={() =>
                          navigate(`/addeditexercisecategory`, {
                            state: { category },
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-category-button"
                        onClick={() => {
                          setCategoryIdToDelete(category._id);
                          setIsConfirmOpen(true);
                        }}
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
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ManageExerciseCategories;
