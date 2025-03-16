import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URL from "../../../config/apiconfig"; // Import your API URL configuration
import "./EditProduct.css"; // Ensure to import your CSS file
import SlideMenu from "../../../components/slidemenu";
import Modal from "../../../components/dialogModal/Modal2"; // Import the Modal component

const EditProduct = () => {
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
      const response = await fetch(`${API_URL}/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setModalMessage("Product updated successfully!");
      setIsModalOpen(true); // Open modal on success

      // Redirect after 0.5 seconds
      setTimeout(() => {
        setIsModalOpen(false); // Close modal
        navigate("/manageproducts");
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the product.");
    }
  };

  return (
    <div className="edit-product-container">
      <SlideMenu />
      <h1 className="edit-product-title">Edit Product</h1>
      <form className="edit-product-form" onSubmit={handleSubmit}>
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
            required
            rows="4"
          ></textarea>
        </div>

        <button className="save-button" type="submit">
          Save Changes
        </button>
      </form>

      {/* Custom Modal for Success Message */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success"
        message={modalMessage}
      />
    </div>
  );
};

export default EditProduct;
