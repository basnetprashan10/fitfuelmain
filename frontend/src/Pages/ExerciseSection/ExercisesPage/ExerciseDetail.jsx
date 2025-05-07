import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./exercise2.css";
import API_URL from "../../../config/apiconfig";

const ExerciseDetail = () => {
  const { category } = useParams(); // Get category from the route
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [videoUrl, setVideoUrl] = useState(""); // Store the video URL for the modal

  useEffect(() => {
    const fetchExercises = async () => {
      try {
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

  // Group exercises by their level
  const groupedExercises = exercises.reduce((acc, exercise) => {
    const { level } = exercise;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(exercise);
    return acc;
  }, {});

  // Open the modal and set the video URL
  const openVideoModal = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl(""); // Clear the video URL when modal closes
  };

  // Function to get the embedded YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exercise-body">
      <div className="heading">
        <h1 className="h11">
          {category.charAt(0).toUpperCase() + category.slice(1)} Exercises
        </h1>
      </div>

      {/* Render exercises by level */}
      {Object.keys(groupedExercises).map((level) => (
        <div key={level}>
          <h2 className="level-heading">{level} Level</h2>
          <div className="exercise-dashboard-categories-container">
            {groupedExercises[level].map((exercise) => (
              <div
                className="exercise-dashboard-category-box"
                key={exercise._id}
                onClick={() =>
                  exercise.videoUrl && openVideoModal(exercise.videoUrl)
                } // Open video if URL exists
              >
                <img
                  src={exercise.img}
                  alt={exercise.name}
                  className="exercise-dashboard-category-image"
                />
                <p className="exercise-dashboard-category-name">
                  {exercise.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Video Modal */}
      {isModalOpen && (
        <div className="video-modal-overlay">
          <div className="video-modal-content">
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <iframe
              width="100%"
              height="auto"
              src={getYouTubeEmbedUrl(videoUrl)}
              title="Exercise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseDetail;
