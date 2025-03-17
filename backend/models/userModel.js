const mongoose = require("mongoose");

// User signup schema definition
const signUpSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ["Trainer", "Seller", "User", "Admin"],
    default: "User",
  },
  bio: {
    type: String,
  },
  bmr: {
    type: String,
  },
  weight: {
    type: String,
  },
});

// Export the Signup model
module.exports = mongoose.model("Signup", signUpSchema);
