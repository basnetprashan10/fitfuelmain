const mongoose = require("mongoose");

// Define the schema for food items
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Food name
  amount: { type: String, required: true }, // Serving size or quantity
  calories: { type: Number, required: true }, // Caloric value
  protein: { type: Number, required: true }, // Protein content in grams
  carbs: { type: Number, required: true }, // Carbohydrates in grams
  fiber: { type: Number, required: true }, // Fiber content in grams
  sugar: { type: Number, required: true }, // Sugar content in grams
  fat: { type: Number, required: true }, // Total fat content in grams
  saturatedFat: { type: Number, required: true }, // Saturated fat in grams
  polyunsaturatedFat: { type: Number, required: true }, // Polyunsaturated fat in grams
  monounsaturatedFat: { type: Number, required: true }, // Monounsaturated fat in grams
  transFat: { type: Number, required: true }, // Trans fat in grams
  cholesterol: { type: Number, required: true }, // Cholesterol in mg
  sodium: { type: Number, required: true }, // Sodium content in mg
  potassium: { type: Number, required: true }, // Potassium content in mg
  vitaminA: { type: Number, required: true }, // Vitamin A in IU or mcg
  vitaminC: { type: Number, required: true }, // Vitamin C in mg
  calcium: { type: Number, required: true }, // Calcium in mg
});

// Create the Food model
const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
