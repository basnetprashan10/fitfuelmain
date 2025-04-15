const express = require("express");
const {
  saveFoodLog,
  getFoodLogByUserId,
  getWeightProgressByUserId,
} = require("../controllers/foodLogController");
const router = express.Router();

// Route to save the food log
router.post("/save", saveFoodLog);
// Route to get the most recent food log
router.get("/:userId", getFoodLogByUserId);
// Get Weight Progress by User ID
router.get("/weight-progress/:userId", getWeightProgressByUserId);

module.exports = router;
