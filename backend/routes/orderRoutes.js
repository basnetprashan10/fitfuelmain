const express = require("express");
const {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
  getAllOrderStatusCount,
} = require("../controllers/orderController");

const router = express.Router();

// Route to create a new order
router.post("/", createOrder);
// Route to get order by ID
router.get("/:userId", getOrdersByUserId);

// Route to get all orders
router.get("/", getAllOrders);
router.put("/", updateOrderStatus);

// Route to get counts of orders by status
router.get("/status/count", getAllOrderStatusCount);

module.exports = router;
