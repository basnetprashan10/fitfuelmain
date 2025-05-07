// Import models for Order and Cart
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel");

const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMode, totalPrice } =
      req.body;

    // Check for empty items array
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "No items provided in the order" });
    }

    // Create new order instance
    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      paymentMode,
      totalPrice,
    });

    const productsToUpdate = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      const remainingStock = product.stock - item.quantity;
      if (remainingStock < 0) {
        return res
          .status(400)
          .json({ message: `${product.name} is not in stock` });
      }
      productsToUpdate.push({
        productId: item.productId,
        newStock: remainingStock,
      });
    }

    await newOrder.save();

    for (const productUpdate of productsToUpdate) {
      await Product.updateOne(
        { _id: productUpdate.productId },
        { stock: productUpdate.newStock }
      );
    }

    if (userId) {
      await clearCart(userId);
    }

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message }); // Include error message
  }
};

// Create a new order and clear the cart
// const createOrder = async (req, res) => {
//   try {
//     const { userId, items, shippingAddress, paymentMode, totalPrice } =
//       req.body;

//     // Create new order instance
//     const newOrder = new Order({
//       userId,
//       items,
//       shippingAddress,
//       paymentMode,
//       totalPrice,
//     });

//     items.forEach(async (item) => {
//       const product = await Product.findById(item.productId);
//       const productStock = product.stock;
//       const isLessItem = productStock - item.quantity;
//       if (isLessItem < 0) {
//         throw new Error(`${product.name} is not in stock`);
//         // res.status(400).json({ message: `${product.name} is not in stock` });
//       }
//     });

//     // Save the order and clear the cart for the user
//     // await newOrder.save();

//     // for (item of items) {
//     //   const product = await Product.findById(item.productId);
//     //   const productStock = product.stock;
//     //   await Product.updateOne(
//     //     { _id: item.productId },
//     //     {
//     //       stock: productStock - item.quantity,
//     //     }
//     //   );
//     // }

//     // await clearCart(userId);

//     res
//       .status(201)
//       .json({ message: "Order created successfully", order: newOrder });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Clear cart for the user (helper function)
const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = []; // Clear items in the cart
      await cart.save();
      console.log("Cart cleared successfully");
    }
  } catch (error) {
    console.error("Clear cart error:", error);
  }
};

// Get all orders for a specific user by userId
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch orders and populate productId for items
    const orders = await Order.find({ userId }).populate("items.productId");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Get all orders in the system, populating user and product details
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId") // Populate productId details for items
      .populate("userId", "fullname"); // Populate user details (fullname)

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// Update the status of a specific order
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

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

    order.orderStatus = status; // Update order status
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// Get the count of orders grouped by status
const getAllOrderStatusCount = async (req, res) => {
  try {
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus", // Group by order status
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert the array of results into an object for easier access
    const result = statusCounts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    // Ensure all statuses are included, even if their count is 0
    const allStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "canceled",
    ];
    allStatuses.forEach((status) => {
      if (!result[status]) {
        result[status] = 0;
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Get all order status count error:", error);
    res.status(500).json({ error: "Failed to retrieve order status counts" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  getAllOrderStatusCount,
};
