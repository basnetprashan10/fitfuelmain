// routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Route to create a new order
router.post("/", createOrder);
// Route to get order by ID
router.get("/:userId", getOrdersByUserId);

// Route to get all orders
router.get("/", getAllOrders);
router.put("/", updateOrderStatus);

module.exports = router;
