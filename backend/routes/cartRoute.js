const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add to cart
router.post("/", cartController.addToCart);

// Get user's cart
router.get("/:userId", cartController.getCart);

// Update cart item quantity
router.put("/update", cartController.updateCartItem);

// Remove item from cart
router.delete("/remove", cartController.removeFromCart);

// Clear entire cart
router.delete("/clear", cartController.clearCart);

module.exports = router;
