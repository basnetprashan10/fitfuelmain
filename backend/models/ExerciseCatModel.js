const mongoose = require("mongoose");

// ExerciseCategory schema definition
const ExerciseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("ExerciseCategory", ExerciseCategorySchema);
