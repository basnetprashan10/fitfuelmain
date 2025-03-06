import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../config/apiconfig";
import { useParams } from "react-router-dom"; // Import useParams

const ExerciseDetail = () => {
  const { category } = useParams(); // Get category from the route
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Convert category to lowercase for the API request
        const lowercaseCategory = category.toLowerCase();
        const response = await axios.get(
          `${API_URL}/api/exercises/${lowercaseCategory}`
        );
        const updatedExercises = response.data.map((exercise) => ({
          ...exercise,
          img: `${API_URL}${exercise.img}`,
        }));
        setExercises(updatedExercises);
      } catch (error) {
        setError("Error fetching exercises.");
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exercise-body">
      <div className="heading">
        <h1 className="h11">
          {category.charAt(0).toUpperCase() + category.slice(1)} Exercises
        </h1>
      </div>
      <div className="exercise-dashboard-categories-container">
        {exercises.map((exercise) => (
          <div className="exercise-dashboard-category-box" key={exercise._id}>
            <img
              src={exercise.img}
              alt={exercise.name}
              className="exercise-dashboard-category-image"
            />
            <p className="exercise-dashboard-category-name">{exercise.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseDetail;
