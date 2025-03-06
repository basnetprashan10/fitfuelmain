const mongoose = require("mongoose");

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
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
