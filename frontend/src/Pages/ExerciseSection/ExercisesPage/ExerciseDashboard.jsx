import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../config/apiconfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./exercise.css";

const Exercises = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/exercisecategory`);
        const updatedCategories = response.data.map((category) => ({
          ...category,
          img: `${API_URL}${category.img}`,
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleBoxClick = (category) => {
    // Use navigate to redirect to the exercise detail page
    navigate(`/exercises/${category.name}`);
  };

  return (
    <div className="exercise-body">
      <div className="heading">
        <h1 className="h11">Exercises by Categories</h1>
      </div>
      <div className="exercise-dashboard-categories-container">
        {categories.map((category, index) => (
          <div
            className="exercise-dashboard-category-box"
            key={index}
            onClick={() => handleBoxClick(category)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="exercise-dashboard-category-image"
            />
            <p className="exercise-dashboard-category-name">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
