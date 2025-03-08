import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../../../config/apiconfig";
import "./AddEditExercise.css";
import SlideMenu from "../../../../components/slidemenu";
import Modal from "../../../../components/dialogModal/Modal";
import axios from "axios";

const AddEditExercise = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exercise } = location.state || {};

  const [formData, setFormData] = useState({
    name: exercise ? exercise.name : "",
    category: exercise ? exercise.category : "",
    level: exercise ? exercise.level : "",
    imgUrl: exercise ? exercise.img : "",
    imgFile: null,
  });

  const [categories, setCategories] = useState([]);
  const [levels] = useState(["Beginner", "Intermediate", "Advanced"]); // Define levels here
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/exercisecategory`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    if (exercise) {
      setFormData({
        name: exercise.name,
        category: exercise.category,
        level: exercise.level,
        imgUrl: exercise.img.startsWith("http://localhost:5000")
          ? ""
          : exercise.img,
        imgFile: null,
      });
    }
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, imgFile: files[0], imgUrl: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value, imgFile: null }));
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/manageExercise");
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
      const payload = {
        name: formData.name,
        category: formData.category.toLowerCase(), // Convert category to lowercase
        level: formData.level,
      };

      if (isUsingFile) {
        const formPayload = new FormData();
        formPayload.append("name", payload.name);
        formPayload.append("category", payload.category);
        formPayload.append("level", payload.level);
        formPayload.append("img", formData.imgFile);

        response = await axios({
          method: exercise ? "put" : "post",
          url: `${API_URL}/api/exercises${exercise ? `/${exercise._id}` : ""}`,
          data: formPayload,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios({
          method: exercise ? "put" : "post",
          url: `${API_URL}/api/exercises${exercise ? `/${exercise._id}` : ""}`,
          data: {
            ...payload,
            imgUrl: formData.imgUrl,
          },
        });
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to save exercise");
      }

      setModalMessage(
        `Exercise ${exercise ? "updated" : "added"} successfully!`
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the exercise.");
    }
  };

  return (
    <div className="add-edit-exercise-container">
      <SlideMenu />
      <h1 className="add-edit-exercise-title">
        {exercise ? "Edit Exercise" : "Add Exercise"}
      </h1>
      <form className="add-edit-exercise-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exercise Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter exercise name"
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select a level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
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
          {exercise ? "Update Exercise" : "Add Exercise"}
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Success"
        message={modalMessage}
        confirmText="Go to Manage Exercises"
      />
    </div>
  );
};

export default AddEditExercise;
