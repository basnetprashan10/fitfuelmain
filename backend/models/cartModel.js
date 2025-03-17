const mongoose = require("mongoose");

// Cart schema to store user cart details
const CartSchema = new mongoose.Schema({
  userId: {
    // Reference to the User model
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        // Reference to the Product model
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        // Quantity of the product in the cart
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

// Export the Cart model
module.exports = mongoose.model("Cart", CartSchema);
