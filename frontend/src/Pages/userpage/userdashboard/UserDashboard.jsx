import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faAppleAlt,
  faShoppingCart,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container1">
      {/* Main Content Section */}
      <section className="dashboard-containt">
        <div className="box-container">
          <div className="box">
            <h3>BMR Calculator</h3>
            <FontAwesomeIcon icon={faCalculator} className="icon" />
            <p>Calculate Your BMR & Daily Calorie Requirements</p>
            <button onClick={() => navigate("/BMRCalculator")} className="btn">
              BMR Calculator
            </button>
          </div>
          <div className="box">
            <h3>Foods Nutrition</h3>
            <FontAwesomeIcon icon={faAppleAlt} className="icon" />
            <p>Cook, Eat, Log and Repeat</p>
            <button onClick={() => navigate("/FoodsNutrition")} className="btn">
              Explore Nutrition
            </button>
          </div>
          <div className="box">
            <h3>Resistance Training</h3>
            <FontAwesomeIcon icon={faDumbbell} className="icon" />
            <p>Track Your Resistance Training</p>
            <button
              onClick={() => navigate("/ExerciseSection/ExerciseDashboard")}
              className="btn"
            >
              Track Training
            </button>
          </div>
          <div className="box">
            <h3>View Order</h3>
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            <p>Track Your Order</p>
            <button onClick={() => navigate("/viewcart")} className="btn">
              View Orders
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
