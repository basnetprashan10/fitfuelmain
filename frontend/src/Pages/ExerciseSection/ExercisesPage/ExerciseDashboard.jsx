import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./exercise.css";
import API_URL from "../../../config/apiconfig";

const Exercises = () => {
  const [categories, setCategories] = useState([]); // State to hold exercise categories
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Function to fetch categories from API
    const fetchCategories = async () => {
      try {
        // Fetch categories from API
        const response = await axios.get(`${API_URL}/api/exercisecategory`);
        const updatedCategories = response.data.map((category) => ({
          ...category,
          img: `${API_URL}${category.img}`, // Update image URL
        }));
        setCategories(updatedCategories); // Set fetched categories to state
      } catch (error) {
        console.error("Error fetching categories:", error); // Log error if fetching fails
      }
    };
    fetchCategories(); // Call the function to fetch categories
  }, []);

  const handleBoxClick = (category) => {
    // Handle category click to navigate to the exercises page of that category
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
