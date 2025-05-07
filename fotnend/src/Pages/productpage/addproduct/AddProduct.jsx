import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../../config/apiconfig";
import "./AddProduct.css";
import SlideMenu from "../../../components/slidemenu";
import Modal from "../../../components/dialogModal/Modal"; // Import the Modal component

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    brand: "", // Added brand field
    price: "",
    stock: "",
    product_type: "", // Added product_type field
    description: "",
    image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand, // Populate brand
        price: product.price,
        stock: product.stock,
        product_type: product.product_type, // Populate product_type
        description: product.description,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/products${product ? `/${product.id}` : ""}`,
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      setModalMessage(`Product ${product ? "updated" : "added"} successfully!`);
      setIsModalOpen(true); // Open modal on success
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the product.");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/manageproducts");
  };

  return (
    <div className="add-product-container">
      <SlideMenu />
      <h1 className="add-product-title">
        {product ? "Edit Product" : "Add Product"}
      </h1>
      <form className="add-product-form1" onSubmit={handleSubmit}>
        {/* First Row: Name and Brand */}
        <div className="form-row">
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand"
              required
            />
          </div>
        </div>

        {/* Second Row: Price and Stock */}
        <div className="form-row">
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </div>
        </div>

        {/* Third Row: Product Type and Image */}
        <div className="form-row">
          <div>
            <label htmlFor="product_type">Product Type</label>
            <select
              id="product_type"
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}
              required
            >
              <option value="">Select product type</option>
              <option value="Supplement">Supplement</option>
              <option value="Equipment">Equipment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
        </div>

        {/* Description Row */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
            rows="4"
            className="description-textarea"
          ></textarea>
        </div>

        <button className="button1" type="submit">
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Custom Modal for Success Message */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Success"
        message={modalMessage}
        confirmText="Add Another Product"
        cancelText="Go to Manage Products"
        onConfirm={() => {
          setIsModalOpen(false);
          setFormData({
            name: "",
            brand: "",
            price: "",
            stock: "",
            product_type: "",
            description: "",
            image: "",
          }); // Reset form
        }}
      />
    </div>
  );
};

export default AddProduct;
