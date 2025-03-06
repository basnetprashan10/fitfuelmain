const Cart = require("../models/cartModel");
const Product = require("../models/ProductModel");

// Add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "userId and productId is required" });
  }
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

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
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

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
exports.clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
