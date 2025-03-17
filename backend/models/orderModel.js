const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  paymentMode: {
    type: String,
    enum: ["cash", "card", "esewa"],
    required: true,
  }, // Add "esewa" to enum
  totalPrice: { type: Number, required: true },
  orderNumber: { type: String, unique: true, required: true },
  orderStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

// Middleware to generate a unique order number before validation
orderSchema.pre("validate", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
