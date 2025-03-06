const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  }, // URL of the image
});

module.exports = mongoose.model("Product", productSchema);
