const Food = require("../models/foodModel");

// Create a new food item
exports.createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json({ message: "Food item created successfully", food });
  } catch (error) {
    res.status(500).json({ message: "Failed to create food item", error });
  }
};

// Get all food items
exports.getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food items", error });
  }
};
