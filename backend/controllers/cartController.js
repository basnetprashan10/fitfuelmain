const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel");

// Add product to cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Ensure required fields are provided
  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "userId and productId is required" });
  }

  try {
    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] }); // Create a new cart if it doesn't exist
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1; // Update quantity if the item is already in the cart
    } else {
      cart.items.push({ productId, quantity: quantity || 1 }); // Add new item if it's not in the cart
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item in the cart and update its quantity
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ error: "Failed to update cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the product from the cart items
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; // Clear all items from the cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItem,
};
