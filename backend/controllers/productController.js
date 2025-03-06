const Product = require("../models/ProductModel");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, brand, price, stock, product_type, description, image } =
    req.body;

  if (!name || !brand || !price || !stock || !product_type) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  try {
    const product = new Product({
      name,
      brand,
      price,
      stock,
      product_type,
      description,
      image,
    });
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      message: "Product deleted successfully",
      data: { id: deletedProduct._id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
