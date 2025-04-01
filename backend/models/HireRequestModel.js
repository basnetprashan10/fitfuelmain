const mongoose = require("mongoose");

// Schema for storing hire trainer requests
const hireRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup", // Reference to the user who sent the request
    required: true,
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup", // Reference to the trainer being hired
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"], // Status of the request
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the request was created
  },
});

const HireRequest = mongoose.model("HireRequest", hireRequestSchema);
module.exports = HireRequest;
