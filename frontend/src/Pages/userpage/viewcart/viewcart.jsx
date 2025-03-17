import React, { useContext, useEffect, useState } from "react";
import "./viewcart.css";
import AuthContext from "../../../context/SessionContext";
import API_URL from "../../../config/apiconfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CartModal from "../../../components/dialogModal/cartModel"; // Import the CartModal component

const ViewCart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousOrders, setPreviousOrders] = useState([]);

  const shippingFee = 5.0;
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

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "",
    cancelText: "",
  });

  const showConfirmationModal = (
    title,
    message,
    onConfirm,
    confirmText,
    cancelText
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText,
      cancelText,
    });
  };

  const showErrorModal = (message) => {
    setModal({
      isOpen: true,
      title: "Error",
      message,
      onConfirm: null,
      confirmText: "",
      cancelText: "Ok",
    });
  };

  const showSuccessModal = (message) => {
    setModal({
      isOpen: true,
      title: "Success",
      message,
      onConfirm: null,
      confirmText: "",
      cancelText: "Ok",
    });
  };

  const showValidationModal = (message) => {
    setModal({
      isOpen: true,
      title: "Error",
      message,
      onConfirm: null,
      confirmText: "",
      cancelText: "Ok",
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null,
      confirmText: "",
      cancelText: "",
    });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;
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

      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  const handleDeleteItem = async (item) => {
    if (!user) return;

    showConfirmationModal(
      "Delete Item",
      "Are you sure you want to delete this item?",
      async () => {
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
            setCartItems((prevItems) =>
              prevItems.filter((cartItem) => cartItem._id !== item._id)
            );
            calculateTotal(cartItems);
            showSuccessModal("Item deleted successfully!");
          } else {
            console.error("Error deleting item:", response.status);
            showErrorModal("Error deleting item, please try again.");
          }
        } catch (error) {
          console.error("Delete error:", error);
          showErrorModal("Delete error, please try again.");
        }
      },
      "Delete",
      "Cancel"
    );
  };

  const handleEsewaPayment = async () => {
    const transaction_uuid = `txn_${Date.now()}`; // Generate a unique transaction ID
    const total_amount = totalPrice + shippingFee;

    // Save order details in local storage
    const orderDetails = {
      userId: user.id,
      cartItems: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalPrice: total_amount,
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // Prepare eSewa payment parameters
    const paymentParams = {
      amount: totalPrice,
      tax_amount: 0,
      product_service_charge: 0,
      product_delivery_charge: shippingFee,
      product_code: "EPAYTEST",
      total_amount: total_amount,
      transaction_uuid: transaction_uuid,
      success_url: `${window.location.origin}/success`, 
      failure_url: `${window.location.origin}/failure`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: "", // Generate signature as before
    };

    // Generate signature and submit the form as before
    const secretKey = "8gBm/:&EnhH.1/q";
    const signatureData = `total_amount=${paymentParams.total_amount},transaction_uuid=${paymentParams.transaction_uuid},product_code=${paymentParams.product_code}`;
    const signature = await generateSignature(signatureData, secretKey);
    paymentParams.signature = signature;

    // Redirect to eSewa payment page
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc.esewa.com.np/api/epay/main/v2/form";

    Object.keys(paymentParams).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = paymentParams[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const generateSignature = async (data, secretKey) => {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(data)
    );
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  };

  const handleCheckout = async () => {
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zip
    ) {
      showValidationModal("Please fill in all shipping address fields.");
      return;
    }

    if (paymentMode === "esewa") {
      handleEsewaPayment();
      return;
    }

    if (
      paymentMode === "card" &&
      (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)
    ) {
      showValidationModal("Please fill in all card details.");
      return;
    }

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
        showSuccessModal(
          `Order placed successfully! Your order number is: ${data.order.orderNumber}`
        );

        // Clear the cart state without refreshing the page
        setCartItems([]);
        setTotalPrice(0);
      } else {
        console.error("Error placing order:", response.status);
        showErrorModal("Error placing order, please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showErrorModal("Checkout error, please try again.");
    }
  };

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${API_URL}/api/orders/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setPreviousOrders(data);
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
                    onClick={() => handleDeleteItem(item)}
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
                placeholder="State"
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
                <option value="esewa">eSewa</option>
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
      <CartModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
      />
    </div>
  );
};

export default ViewCart;
