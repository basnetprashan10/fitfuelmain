const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to create a new product
router.post("/", productController.createProduct);

// Route to get all products
router.get("/", productController.getProducts);

// Route to get a product by its ID
router.get("/:id", productController.getProductById);

// Route to update a product by its ID
router.put("/:id", productController.updateProduct);

// Route to delete a product by its ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
