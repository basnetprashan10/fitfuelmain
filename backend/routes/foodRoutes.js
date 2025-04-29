const express = require("express");
const router = express.Router();
const foodController = require("../controllers/FoodController");

// Route to get all food items
router.get("/", foodController.getAllFood);

// Route to create a new food item
router.post("/", foodController.createFood);

module.exports = router;
