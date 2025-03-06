import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import "./BMRCalculator.css";

const BMRCalculator = ({ setBmr }) => {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmr, setBmrState] = useState(null);

  const calculateBMR = () => {
    if (!weight || !height || !age) {
      alert("Please fill all fields!");
      return;
    }

    let calculatedBMR =
      gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    setBmrState(calculatedBMR.toFixed(2));
    setBmr(calculatedBMR.toFixed(2)); // Update parent state with BMR
  };

  return (
    <div className="bmr-container">
      <h2>
        <FontAwesomeIcon icon={faCalculator} /> BMR Calculator
      </h2>
      <p>Find out how many calories your body burns at rest.</p>

      {/* BMR Inputs Section */}
      <div className="input-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="input-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
        />
      </div>

      <div className="input-group">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter your height"
        />
      </div>

      <div className="input-group">
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
        />
      </div>

      <button onClick={calculateBMR} className="calculate-btn">
        Calculate BMR
      </button>

      {bmr && (
        <div className="result">
          <h3>Your BMR: {bmr} kcal/day</h3>
          <p>🔥 This is the number of calories your body burns at rest.</p>
        </div>
      )}
    </div>
  );
};

const DailyCalories = ({ bmr }) => {
  const [customActivity, setCustomActivity] = useState("");

  const getTotalCalories = () => {
    let multiplier = customActivity ? parseFloat(customActivity) : 1.2;
    return bmr ? (bmr * multiplier).toFixed(2) : null;
  };

  return (
    <div className="calories-container">
      <h3>🛠 Your Daily Calorie Requirements</h3>

      <div className="activity-list">
        {bmr && (
          <>
            <p>
              🏋️ <b>Little to no exercise:</b> {bmr && (bmr * 1.2).toFixed(2)}{" "}
              kcal/day
            </p>
            <p>
              🚶 <b>Light exercise (1-3 days/week):</b>{" "}
              {bmr && (bmr * 1.375).toFixed(2)} kcal/day
            </p>
            <p>
              🏃 <b>Moderate exercise (3-5 days/week):</b>{" "}
              {bmr && (bmr * 1.55).toFixed(2)} kcal/day
            </p>
            <p>
              💪 <b>Heavy exercise (5-6 days/week):</b>{" "}
              {bmr && (bmr * 1.725).toFixed(2)} kcal/day
            </p>
            <p>
              🏋️‍♂️ <b>Very intense exercise (6-7 days/week):</b>{" "}
              {bmr && (bmr * 1.9).toFixed(2)} kcal/day
            </p>
          </>
        )}
      </div>

      <div className="input-group">
        <label>Custom Activity Level (Multiplier):</label>
        <input
          type="number"
          step="0.1"
          value={customActivity}
          onChange={(e) => setCustomActivity(e.target.value)}
          placeholder="e.g., 1.4 for moderate activity"
        />
      </div>

      {bmr && (
        <div className="custom-result">
          <h3>
            Total Calories (Custom Activity): {getTotalCalories()} kcal/day
          </h3>
        </div>
      )}
    </div>
  );
};


const BMRCalculatorPage = () => {
  const [bmr, setBmr] = useState(null);

  return (
    <div className="bmrpage-container">
      <div className="bmr-calculator-section">
        <BMRCalculator setBmr={setBmr} />
        {/* Render DailyCalories always, but BMR-dependent values will show after calculation */}
        <DailyCalories bmr={bmr} />
      </div>
    </div>
  );
};

export default BMRCalculatorPage;
