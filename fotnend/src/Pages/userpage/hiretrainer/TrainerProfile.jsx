import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../../config/apiconfig";
import AuthContext from "../../../context/SessionContext";
import CartModal from "../../../components/dialogModal/cartModel"; // Import the CartModal component
import "./TrainerProfile.css";

const TrainerProfile = () => {
  const [trainers, setTrainers] = useState([]);
  const { user } = useContext(AuthContext); // Get logged-in user
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success", "error", or "confirmation"
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/signup/getalluser`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          const filteredTrainers = data.data.filter((user) => {
            if (user.user_type === "Trainer") {
              return true;
            }
            return false;
          });
          setTrainers(filteredTrainers);
        }
      })
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  const handleHireTrainer = async (trainer) => {
    // Check if user is logged in
    if (!user || !user.id) {
      setModalTitle("Login Required");
      setModalMessage("Please log in to hire a trainer.");
      setModalType("error");
      setModalOpen(true);
      return;
    }

    // Show confirmation modal
    setSelectedTrainer(trainer);
    setModalTitle("Confirm Hire");
    setModalMessage(`Are you sure you want to hire ${trainer.fullname}?`);
    setModalType("confirmation");
    setModalOpen(true);
  };

  const confirmHireTrainer = async () => {
    setModalOpen(false); // Close the confirmation modal

    const body = JSON.stringify({
      userId: user.id,
      trainerId: selectedTrainer._id,
    });

    try {
      const response = await fetch(`${API_URL}/api/hire-trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Failed to send hire request.";

        // Parse the error message if it's in JSON format
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage += ` ${errorData.message}`;
          }
        } catch (e) {
          // If parsing fails, use the raw error text
          errorMessage += ` ${errorText}`;
        }

        setModalTitle("Error");
        setModalMessage(errorMessage);
        setModalType("error");
        setModalOpen(true);
        return;
      }

      const result = await response.json();
      if (result.message === "success") {
        setModalTitle("Success");
        setModalMessage("Hire request sent successfully!");
        setModalType("success");
        setModalOpen(true);
      } else {
        setModalTitle("Error");
        setModalMessage("Failed to send hire request.");
        setModalType("error");
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalTitle("Error");
      setModalMessage("Failed to send hire request. Please try again later.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  return (
    <div className="trainer-container">
      <h2 className="trainer-title">Meet Our Trainers</h2>
      <div className="trainer-list">
        {trainers.length > 0 ? (
          trainers.map((trainer) => (
            <div key={trainer._id} className="trainer-card">
              <FontAwesomeIcon icon={faUser} className="trainer-icon" />
              <h3>{trainer.fullname}</h3>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {trainer.email}
              </p>
              <p>
                <strong>Age:</strong> {trainer.age}
              </p>
              <p>
                <strong>Gender:</strong> {trainer.gender}
              </p>
              <p>
                <strong>Bio:</strong> {trainer.bio || "No bio available"}
              </p>
              <button
                className="hire-btn"
                onClick={() => handleHireTrainer(trainer)} // Pass the entire trainer object
              >
                Hire Trainer <FontAwesomeIcon icon={faDumbbell} />
              </button>
            </div>
          ))
        ) : (
          <p className="no-trainers">No trainers available at the moment.</p>
        )}
      </div>

      {/* CartModal for displaying messages */}
      <CartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={modalType === "confirmation" ? confirmHireTrainer : null}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalType === "confirmation" ? "Confirm" : null}
        cancelText={modalType === "confirmation" ? "Cancel" : "OK"}
      />
    </div>
  );
};

export default TrainerProfile;
