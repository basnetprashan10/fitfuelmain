const mongoose = require("mongoose");

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

module.exports = mongoose.model("ExerciseCategory", ExerciseCategorySchema);
