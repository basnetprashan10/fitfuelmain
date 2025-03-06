// models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
  paymentMode: { type: String, enum: ["cash", "card"], required: true },
  totalPrice: { type: Number, required: true },
  orderNumber: { type: String, unique: true, required: true },
  orderStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

// Generate a unique order number
orderSchema.pre("validate", function (next) {
  if (!this.orderNumber) {
    // Ensure we only generate if orderNumber is not set
    this.orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
