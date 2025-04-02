const express = require("express");
const router = express.Router();
const {
  hireTrainer,
  getByTrainerId,
  updateStatus,
} = require("../controllers/hireTrainerController");

// Route to hire a trainer
router.post("/", hireTrainer);

// Route to get hire requests by trainerId
router.get("/:trainerId", getByTrainerId);

// Route to update the status of a hire request
router.patch("/status/:requestId", updateStatus);

module.exports = router;
