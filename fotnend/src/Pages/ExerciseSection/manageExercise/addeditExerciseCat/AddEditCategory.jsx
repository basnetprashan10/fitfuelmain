import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../../../config/apiconfig";
import "./AddEditCategory.css";
import SlideMenu from "../../../../components/slidemenu";
import Modal from "../../../../components/dialogModal/Modal";
import axios from "axios";

const AddEditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};

  const [formData, setFormData] = useState({
    name: category ? category.name : "",
    imgUrl: category ? category.img : "",
    imgFile: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        imgUrl: category.img.startsWith("http://localhost:5000")
          ? ""  // Ignore local image paths
          : category.img, // Keep external URLs
        imgFile: null,
      });
    }
  }, [category]);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, imgFile: files[0], imgUrl: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value, imgFile: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsingFile = formData.imgFile !== null;
    const isUsingUrl = formData.imgUrl.trim() !== "";

    if (!isUsingFile && !isUsingUrl) {
      alert("Please provide either an image URL or upload an image file.");
      return;
    }

    try {
      let response;
      if (isUsingFile) {
        const formPayload = new FormData();
        formPayload.append("name", formData.name);
        formPayload.append("img", formData.imgFile);

        response = await axios({
          method: category ? "put" : "post",
          url: `${API_URL}/api/exercisecategory${
            category ? `/${category._id}` : ""
          }`,
          data: formPayload,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios({
          method: category ? "put" : "post",
          url: `${API_URL}/api/exercisecategory${
            category ? `/${category._id}` : ""
          }`,
          data: { name: formData.name, imgUrl: formData.imgUrl },
        });
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to save category");
      }

      setModalMessage(
        `Category ${category ? "updated" : "added"} successfully!`
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the category.");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/manageExerciseCategory");
  };
  return (
    <div className="add-edit-category-container">
      <SlideMenu />
      <h1 className="add-edit-category-title">
        {category ? "Edit Category" : "Add Category"}
      </h1>
      <form className="add-edit-category-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>
        <div>
          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label htmlFor="imgFile">Upload Image</label>
          <input
            type="file"
            id="imgFile"
            name="imgFile"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <p className="image-note">
          * Please provide either an image URL or upload an image file.
        </p>
        <button className="button" type="submit">
          {category ? "Update Category" : "Add Category"}
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Success"
        message={modalMessage}
        confirmText="Go to Manage Categories"
      />
    </div>
  );
};

export default AddEditCategory;
