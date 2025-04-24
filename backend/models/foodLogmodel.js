const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  log: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fiber: Number,
      sugar: Number,
      fat: Number,
      saturatedFat: Number,
      polyunsaturatedFat: Number,
      monounsaturatedFat: Number,
      transFat: Number,
      cholesterol: Number,
      sodium: Number,
      potassium: Number,
      vitaminA: Number,
      vitaminC: Number,
      calcium: Number,
    },
  ],
  summedLog: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fiber: Number,
    sugar: Number,
    fat: Number,
    saturatedFat: Number,
    polyunsaturatedFat: Number,
    monounsaturatedFat: Number,
    transFat: Number,
    cholesterol: Number,
    sodium: Number,
    potassium: Number,
    vitaminA: Number,
    vitaminC: Number,
    calcium: Number,
  },
  weightProgress: Number, // New field to store weight progress
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoodLog", foodLogSchema);
