import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead
import "./AimPage.css";
import API_URL from "../../../config/apiconfig";

const AimPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      title: "Bulking",
      carddetails: [
        "Calories intake",
        "BMR intake",
        "Resistance training",
        "Cardio",
      ],
      details: [
        "Calculate BMR: Determine your basal metabolic rate.",
        "Caloric Surplus: Start with BMR + 200 calories/day.",
        "Weekly Increase: Add 25 calories weekly.",
        "Nutrition: High-protein, healthy fats, complex carbs.",
        "Resistance Training: Train 4-5 times a week.",
        "Monitor Progress: Assess body composition regularly.",
        "Adjust: Modify calories and training as needed.",
      ],
      duration: "4 months plan",
      img: `${API_URL}/images/2.webp`,
    },
    {
      title: "Cutting",
      carddetails: [
        "Calories intake",
        "Calories deficit",
        "Resistance training",
        "Cardio",
      ],
      details: [
        "Calculate BMR: Use an online BMR calculator.",
        "Caloric Deficit: Start with BMR - 200 calories/day.",
        "Weekly Decrease: Subtract 25 calories weekly.",
        "Nutrition Focus: High protein, low-density carbs, healthy fats.",
        "Resistance Training: Maintain 4-5 sessions weekly.",
        "Monitor Progress: Check body composition.",
        "Adjust: Adapt calorie intake based on results.",
      ],
      duration: "4 months plan",
      img: `${API_URL}/images/1.webp`,
    },
    {
      title: "Maintenance",
      carddetails: [
        "Calories intake",
        "BMR intake",
        "Resistance training",
        "Cardio",
      ],
      details: [
        "Calculate BMR: Determine your basal metabolic rate.",
        "BMR intake: Maintain your caloric needs.",
        "Resistance Training: Train 3-4 times a week.",
        "Cardio: Include moderate cardio sessions.",
      ],
      duration: "1 year plan",
      img: `${API_URL}/images/3.jpeg`,
    },
  ];

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const navigateToBMRCalculator = () => {
    navigate("/BMRCalculator"); // Change to your BMR calculator route
  };

  return (
    <div className="page-plan">
      <div className="aim-container">
        <h2 className="aim-title">Choose Your Fitness Plan</h2>
        <div className="plan-list-horizontal">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="plan-card"
              onClick={() => handlePlanClick(plan)}
            >
              <h3>{plan.title}</h3>
              <ul>
                {plan.carddetails.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <p className="plan-duration">{plan.duration}</p>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="modal1">
            <div className="modal1-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedPlan.title}</h2>
              {selectedPlan.img && (
                <img
                  className="img"
                  src={selectedPlan.img}
                  alt={`${selectedPlan.title} plan`}
                />
              )}
              <div className="list-cont">
                <ul>
                  {selectedPlan.details.map((detail, index) => (
                    <li key={index}>
                      {index + 1}. {"  "} {detail}
                    </li>
                  ))}
                </ul>
                <p
                  className="plan-duration"
                  onClick={navigateToBMRCalculator}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Calculate Your BMR
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AimPage;
