import React, { useContext, useEffect, useState } from "react";
import "./viewcart.css";
import AuthContext from "../../../context/SessionContext";
import API_URL from "../../../config/apiconfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon

const ViewCart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousOrders, setPreviousOrders] = useState([]);

  const shippingFee = 5.0; // Fixed shipping fee for example
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentMode, setPaymentMode] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return; // Don't fetch if not logged in
      try {
        const response = await fetch(`${API_URL}/api/cart/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          calculateTotal(data.items);
        } else {
          console.error("Error fetching cart items:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );

      // Calculate total based on updated state
      calculateTotal(updatedItems);
      return updatedItems;
    });
  };
  const handleDeleteItem = async (item) => {
    if (!user) return; // Don't delete if not logged in
    try {
      const response = await fetch(`${API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: item.productId._id,
        }),
      });

      if (response.ok) {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter(
            (cartItem) => cartItem._id !== item._id
          );

          // Calculate total based on updated state
          calculateTotal(updatedItems);

          // Clear the cart if it is empty
          if (updatedItems.length === 0) {
            clearCart(user.id); // Call clear cart function
          }

          return updatedItems;
        });
      } else {
        console.error("Error deleting item:", response.status);
        alert("Error deleting item, please try again.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete error, please try again.");
    }
  };

  const clearCart = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        console.error("Error clearing cart:", response.status);
        alert("Error clearing cart, please try again.");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      alert("Clear cart error, please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          shippingAddress,
          paymentMode,
          totalPrice: totalPrice + shippingFee,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          `Order placed successfully! Your order number is: ${data.order.orderNumber}`
        );
        // Refresh the page to clear the cart and update any data
        window.location.reload();
      } else {
        console.error("Error placing order:", response.status);
        alert("Error placing order, please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout error, please try again.");
    }
  };

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      if (!user) return; // Don't fetch if not logged in
      try {
        const response = await fetch(`${API_URL}/api/orders/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setPreviousOrders(data); // Set the fetched orders
        } else {
          console.error("Error fetching previous orders:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPreviousOrders();
  }, [user]);

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.productId.image} alt={item.productId.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.productId.name}</h3>
                    <p>Brand: {item.productId.brand}</p>
                  </div>
                  <div className="item-price-quantity">
                    <p>Price: Rs {item.productId.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-subtotal">
                    <p>
                      Subtotal: Rs 
                      {(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item)} // Pass the entire item object
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="checkout-summary-container">
            <h2>Checkout Summary</h2>
            <div className="checkout-summary">
              <p>Subtotal: Rs {totalPrice.toFixed(2)}</p>
              <p>Shipping Fee: Rs {shippingFee.toFixed(2)}</p>
              <h3>Total: Rs {(totalPrice + shippingFee).toFixed(2)}</h3>
            </div>
            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <input
                type="text"
                placeholder="Street"
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Provience"
                value={shippingAddress.state}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={shippingAddress.zip}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    zip: e.target.value,
                  })
                }
              />
            </div>
            <div className="payment-mode">
              <h3>Payment Mode</h3>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
              {paymentMode === "card" && (
                <div className="card-details">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardNumber: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={cardDetails.expiryDate}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <div className="button-con">
              <button onClick={handleCheckout} className="checkout-button44">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        {previousOrders.length > 0 && (
          <div className="previous-orders">
            <h2>Your Previous Orders</h2>
            {previousOrders.map((order) => (
              <div key={order._id} className="previous-order">
                <p>
                  <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                <div className="ordered-items">
                  <h4>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      <p>
                        {item.productId.name} (x{item.quantity})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCart;
