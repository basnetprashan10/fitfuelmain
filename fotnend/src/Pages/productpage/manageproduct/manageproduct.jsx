import React, { useState, useEffect } from "react";
import "./managerproducts.css";
import SlideMenu from "../../../components/slidemenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../config/apiconfig";
import Modal from "../../../components/dialogModal/Modal"; // Import your Modal component

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.error("Fetched data is not an array:", result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== id));
      setIsSuccessOpen(true); // Show success modal
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsConfirmOpen(false); // Close confirmation modal
      setProductIdToDelete(null); // Reset product ID
    }
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
    }
  };

  const groupProductsByType = (productType) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }

    return products
      .filter((product) =>
        productType ? product.product_type === productType : true
      )
      .filter((products) =>
        search
          ? products.name.toLowerCase().includes(search.toLocaleLowerCase())
          : true
      );
  };

  return (
    <div className="manage-products-container">
      <SlideMenu />
      <div className="header-container">
        <h1 className="header-container-title">Manage Products</h1>
        <div className="add-button1">
          <button onClick={() => navigate("/addproducts")}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Product
          </button>
        </div>
      </div>
      <div className="list-container">
        <div className="list-title">
          <h3>Products List</h3>
          <div className="listhead-filter">
            <select
              className="filter-opt"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginLeft: "20px" }}
            >
              <option value="">All</option>
              <option value="Supplement">Supplement</option>
              <option value="Equipment">Equipment</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="products-list">
          {groupProductsByType(filter).length === 0 ? (
            <p>No products found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupProductsByType(filter).map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td>{product.product_type}</td>
                    <td>Rs {product.price.toFixed(2)}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image22"
                      />
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => {
                          navigate(`/editproduct/${product._id}`, {
                            state: { product },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          setProductIdToDelete(product._id);
                          setIsConfirmOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Success"
        message="Product deleted successfully!"
        confirmText="Ok"
      />
    </div>
  );
};

export default ManageProducts;
