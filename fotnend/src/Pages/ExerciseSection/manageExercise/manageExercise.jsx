import React, { useState, useEffect } from "react";
import "./manageExercises.css"; // Add your styles for exercises here
import SlideMenu from "../../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../config/apiconfig";
import Modal from "../../../components/dialogModal/Modal";
import axios from "axios";

const ManageExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [exerciseIdToDelete, setExerciseIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/exercises`);
        const updatedExercises = response.data.map((exercise) => ({
          ...exercise,
          img: exercise.img.startsWith("http")
            ? exercise.img
            : `${API_URL}${exercise.img}`,
        }));
        setExercises(updatedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const handleDeleteExercise = async () => {
    if (exerciseIdToDelete) {
      try {
        await axios.delete(`${API_URL}/api/exercises/${exerciseIdToDelete}`);
        setExercises(exercises.filter((ex) => ex._id !== exerciseIdToDelete));
      } catch (error) {
        console.error("Error deleting exercise:", error);
      } finally {
        setIsConfirmOpen(false);
        setExerciseIdToDelete(null);
      }
    }
  };

  return (
    <div className="manage-exercises-container">
      <SlideMenu />
      <div className="header-container">
        <h1 className="header-title">Manage Exercises</h1>
        <div className="add-exercise-button">
          <button onClick={() => navigate("/addeditexercise")}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Exercise
          </button>
        </div>
      </div>
      <div className="list-container">
        <div className="list-title">
          <h3>Exercise List</h3>
        </div>
        <div className="exercise-list">
          {exercises.length === 0 ? (
            <p>No exercises found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise._id}>
                    <td>{exercise.name}</td>
                    <td>{exercise.category}</td>
                    <td>{exercise.level}</td>
                    <td>
                      <img
                        src={exercise.img}
                        alt={exercise.name}
                        className="exercise-image"
                      />
                    </td>
                    <td>
                      <button
                        className="edit-exercise-button"
                        onClick={() =>
                          navigate(`/addeditexercise`, {
                            state: { exercise },
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-exercise-button"
                        onClick={() => {
                          setExerciseIdToDelete(exercise._id);
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
        onConfirm={handleDeleteExercise}
        title="Confirm Deletion"
        message="Are you sure you want to delete this exercise?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ManageExercises;
