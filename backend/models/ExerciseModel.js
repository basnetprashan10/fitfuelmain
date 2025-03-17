const mongoose = require("mongoose");

// Exercise schema definition
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
  videoUrl: {
    // New field for video URL
    type: String,
    default: "",
  },
});

// Export the Exercise model
module.exports = mongoose.model("Exercise", exerciseSchema);
