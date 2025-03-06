// controllers/orderController.js
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMode, totalPrice } =
      req.body;

    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      paymentMode,
      totalPrice,
      // No need to set orderNumber here, it will be generated automatically
    });

    await newOrder.save();

    // Clear the user's cart after the order is created
    await clearCart(userId); // Call the clearCart function

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear entire cart function to be reused
const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
      console.log("Cart cleared successfully");
    }
  } catch (error) {
    console.error("Clear cart error:", error);
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('items.productId');
    
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body; // Expect orderId and status in the request body

  if (!orderId || !status) {
    return res
      .status(400)
      .json({ message: "Order ID and status are required" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status; // Update the status
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
};
