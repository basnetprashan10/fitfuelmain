const FoodLog = require("../models/foodLogmodel");
const User = require("../models/userModel");

// Save Food Log
const saveFoodLog = async (req, res) => {
  try {
    const { userId, log, summedLog } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    // Fetch user details to get BMR and initial weight
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bmr = parseFloat(user.bmr);
    const initialWeight = parseFloat(user.weight);

    // Check if a log already exists for today
    let existingLog = await FoodLog.findOne({
      userId,
      createdAt: { $gte: today },
    });

    if (existingLog) {
      // Append new foods to the log
      existingLog.log.push(...log);

      // Update the summed values
      existingLog.summedLog.calories += summedLog.calories;
      existingLog.summedLog.protein += summedLog.protein;
      existingLog.summedLog.carbs += summedLog.carbs;
      existingLog.summedLog.fiber += summedLog.fiber;
      existingLog.summedLog.sugar += summedLog.sugar;
      existingLog.summedLog.fat += summedLog.fat;
      existingLog.summedLog.saturatedFat += summedLog.saturatedFat;
      existingLog.summedLog.polyunsaturatedFat += summedLog.polyunsaturatedFat;
      existingLog.summedLog.monounsaturatedFat += summedLog.monounsaturatedFat;
      existingLog.summedLog.transFat += summedLog.transFat;
      existingLog.summedLog.cholesterol += summedLog.cholesterol;
      existingLog.summedLog.sodium += summedLog.sodium;
      existingLog.summedLog.potassium += summedLog.potassium;
      existingLog.summedLog.vitaminA += summedLog.vitaminA;
      existingLog.summedLog.vitaminC += summedLog.vitaminC;
      existingLog.summedLog.calcium += summedLog.calcium;

      // Calculate weight progress
      const calorieDifference = existingLog.summedLog.calories - bmr;
      const weightChange = calorieDifference / 3500; // 3500 calories = 1 pound
      existingLog.weightProgress = initialWeight + weightChange;

      await existingLog.save();
      res.status(200).json({
        message: "Food log updated successfully",
        foodLog: existingLog,
      });
    } else {
      // Create a new log if none exists for today
      const calorieDifference = summedLog.calories - bmr;
      const weightChange = calorieDifference / 3500; // 3500 calories = 1 pound
      const weightProgress = initialWeight + weightChange;

      const newFoodLog = new FoodLog({
        userId,
        log,
        summedLog,
        weightProgress,
      });
      await newFoodLog.save();
      res.status(201).json({
        message: "Food log saved successfully",
        foodLog: newFoodLog,
      });
    }
  } catch (error) {
    console.error("Error saving food log:", error);
    res.status(500).json({ message: "Error saving food log" });
  }
};

// Get Food Log by User ID
const getFoodLogByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const foodLogs = await FoodLog.find({ userId }).sort({ createdAt: -1 }); // Get all logs sorted by date
    res.status(200).json(foodLogs);
  } catch (error) {
    console.error("Error fetching food log:", error);
    res.status(500).json({ message: "Error fetching food log" });
  }
};

// Get Weight Progress by User ID
const getWeightProgressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const weightProgressData = await FoodLog.find({ userId })
      .sort({ createdAt: 1 })
      .select("createdAt weightProgress");
    res.status(200).json(weightProgressData);
  } catch (error) {
    console.error("Error fetching weight progress:", error);
    res.status(500).json({ message: "Error fetching weight progress" });
  }
};

module.exports = { saveFoodLog, getFoodLogByUserId, getWeightProgressByUserId };
