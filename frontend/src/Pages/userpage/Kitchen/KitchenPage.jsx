import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select
import "./KitchenPage.css";
import API_URL from "../../../config/apiconfig";
import AuthContext from "../../../context/SessionContext";
import CartModal from "../../../components/dialogModal/kitchenModel"; // Import the CartModal component

const KitchenPage = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([{ id: 1, foods: [] }]);
  const [calories, setCalories] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null); // Change to null for react-select
  const [showPopup, setShowPopup] = useState(false);
  const [availableFoods, setAvailableFoods] = useState([]);

  // State for popups
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/food`);
        setAvailableFoods(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const newCalories = {};
    meals.forEach((meal) => {
      newCalories[meal.id] = meal.foods.reduce(
        (total, food) => total + Number(food.calories),
        0
      );
    });
    setCalories(newCalories);
  }, [meals]);

  const totalCalories = Object.values(calories).reduce((a, b) => a + b, 0);

  const handleAddFood = (mealId) => {
    setSelectedMeal(mealId);
    setShowPopup(true);
  };

  const handleFoodSelection = (selectedOption) => {
    setSelectedFood(selectedOption);
  };

  const addFoodToMeal = () => {
    if (selectedFood && selectedMeal !== null) {
      const foodToAdd = availableFoods.find(
        (food) => food.name === selectedFood.value
      );
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal.id === selectedMeal
            ? { ...meal, foods: [...meal.foods, foodToAdd] }
            : meal
        )
      );
      setSelectedMeal(null);
      setSelectedFood(null);
      setShowPopup(false);
    }
  };

  const addNewMeal = () => {
    const newMeal = { id: meals.length + 1, foods: [] };
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };


  const saveFoodLog = async () => {
    if (meals.length === 0 || meals.every((meal) => meal.foods.length === 0)) {
      setPopupMessage("Please add at least one meal with food before saving.");
      setShowValidationPopup(true);
      return;
    }
  
    setPopupMessage("Are you sure you want to save this food log?");
    setShowConfirmationPopup(true);
  };
  
  const confirmSaveFoodLog = async () => {
    setShowConfirmationPopup(false);
  
    const log = meals.flatMap((meal) =>
      meal.foods.map((food) => ({
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fiber: food.fiber,
        sugar: food.sugar,
        fat: food.fat,
        saturatedFat: food.saturatedFat,
        polyunsaturatedFat: food.polyunsaturatedFat,
        monounsaturatedFat: food.monounsaturatedFat,
        transFat: food.transFat,
        cholesterol: food.cholesterol,
        sodium: food.sodium,
        potassium: food.potassium,
        vitaminA: food.vitaminA,
        vitaminC: food.vitaminC,
        calcium: food.calcium,
      }))
    );
  
    const summedLog = log.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fiber += item.fiber;
        acc.sugar += item.sugar;
        acc.fat += item.fat;
        acc.saturatedFat += item.saturatedFat;
        acc.polyunsaturatedFat += item.polyunsaturatedFat;
        acc.monounsaturatedFat += item.monounsaturatedFat;
        acc.transFat += item.transFat;
        acc.cholesterol += item.cholesterol;
        acc.sodium += item.sodium;
        acc.potassium += item.potassium;
        acc.vitaminA += item.vitaminA;
        acc.vitaminC += item.vitaminC;
        acc.calcium += item.calcium;
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fiber: 0,
        sugar: 0,
        fat: 0,
        saturatedFat: 0,
        polyunsaturatedFat: 0,
        monounsaturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        vitaminA: 0,
        vitaminC: 0,
        calcium: 0,
      }
    );
  
    if (!user?.id) {
      setPopupMessage("User ID is required to save food log.");
      setShowErrorPopup(true);
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/api/foodlog/save`, {
        userId: user.id,
        log, // Send individual food items
        summedLog, // Send summed values
      });
  
      setPopupMessage("Food log saved successfully!");
      setShowSuccessPopup(true);
      console.log("Food log saved:", response.data);
    } catch (error) {
      setPopupMessage("Error saving food log. Please try again.");
      setShowErrorPopup(true);
      console.error("Error saving food log:", error);
    }
  };
  // Format available foods for react-select
  const foodOptions = availableFoods.map((food) => ({
    value: food.name,
    label: `${food.name} - ${food.amount} (${food.calories} cals)`,
  }));

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1d1c24", // Match your theme's background color
      color: "#fff", // Text color
      borderColor: "#b31717", // Border color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#b31717" : "#1d1c24", // Selected and non-selected options
      color: state.isSelected ? "#fff" : "#fff", // Text color
      "&:hover": {
        backgroundColor: "#b31717", // Hover color
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // Selected value text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1d1c24", // Dropdown menu background
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff", // Input text color
    }),
  };

  return (
    <div className="kitchen-container-page">
      <h2 className="kitchen-title">
        Kitchen <span className="icon">🏋️‍♂️</span>
      </h2>
      <div className="kitchen-container">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <div className="meal-header">
              <h3>Meal {meal.id}</h3>
              <input
                type="number"
                className="calorie-input"
                value={calories[meal.id] || 0}
                readOnly
              />
            </div>
            <button
              className="add-food-btn"
              onClick={() => handleAddFood(meal.id)}
            >
              ADD FOOD
            </button>

            <ul className="food-list">
              {meal.foods.map((food, index) => (
                <li key={index} className="food-item">
                  {food.name} - {food.amount} ({food.calories} cals)
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button className="add-meal-btn" onClick={addNewMeal}>
          ➕ Add New Meal
        </button>

        <div className="total-calories">
          Total Calories consumed ={" "}
          <input type="text" value={totalCalories} readOnly />
        </div>

        <button className="save-log-btn" onClick={saveFoodLog}>
          Save Log
        </button>

        {showPopup && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowPopup(false)}>
                &times;
              </span>
              <h4>Select Food for Meal {selectedMeal}</h4>
              <Select
                options={foodOptions}
                value={selectedFood}
                onChange={handleFoodSelection}
                placeholder="Choose a food"
                isSearchable
                styles={customStyles} // Apply custom styles
              />
              <button className="confirm-food-btn" onClick={addFoodToMeal}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popups */}
      <CartModal
        isOpen={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
        onConfirm={confirmSaveFoodLog}
        title="Confirmation"
        message={popupMessage}
        confirmText="Yes"
        cancelText="No"
      />

      <CartModal
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Success"
        message={popupMessage}
        cancelText="Ok"
      />

      <CartModal
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title="Error"
        message={popupMessage}
        cancelText="Ok"
      />

      <CartModal
        isOpen={showValidationPopup}
        onClose={() => setShowValidationPopup(false)}
        title="Validation"
        message={popupMessage}
        cancelText="Ok"
      />
    </div>
  );
};

export default KitchenPage;