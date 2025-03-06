import React, { useState, useEffect, useContext } from "react";
import "./BrowseProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../../config/apiconfig";
import AuthContext from "../../../context/SessionContext";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const defaultImage =
    "http://www.sitech.co.id/assets/img/products/default.jpg";

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    setIsAdding(true);
    try {
      const response = await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, // Get userId from context
          productId: product._id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong!");
    }

    setIsAdding(false);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => (e.target.src = defaultImage)}
      />
      <div className="product-info">
        <p className="store">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="price-section">
          <p className="price">${product.price.toFixed(2)}</p>
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <FontAwesomeIcon icon={faShoppingCart} />{" "}
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        } else {
          console.error("Error fetching products:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="banner"></div>
      <div className="product-section">
        <div className="header">
          <h1>Supplements And Equipment</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-box"
          />
        </div>
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowseProducts;
