import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import API_URL from "../../config/apiconfig";

const Success = () => {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const orderSavedRef = useRef(false); // Use a ref to track if the order has been saved
  const navigate = useNavigate(); // Initialize the navigate function

  // Decode the base64 encoded data
  const decodedData = data ? JSON.parse(atob(data)) : null;

  useEffect(() => {
    if (decodedData && !orderSavedRef.current) {
      // Retrieve and immediately clear order details from local storage
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
      localStorage.removeItem("orderDetails"); // Clear local storage immediately

      if (orderDetails && !orderSavedRef.current) {
        orderSavedRef.current = true; // Mark the order as saved

        // Save the order in the database
        const saveOrder = async () => {
          try {
            const response = await fetch(`${API_URL}/api/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: orderDetails.userId,
                items: orderDetails.cartItems,
                shippingAddress: orderDetails.shippingAddress,
                paymentMode: "esewa",
                totalPrice: orderDetails.totalPrice,
              }),
            });

            if (response.ok) {
              console.log("Order saved successfully!");
            } else {
              console.error("Error saving order:", response.status);
            }
          } catch (error) {
            console.error("Error saving order:", error);
          }
        };

        saveOrder();
      }
    }
  }, [decodedData]); // Only depend on decodedData

  return (
    <div className="page">
      <h1>Payment Successful</h1>
      {decodedData ? (
        <div>
          <p>Transaction Code: {decodedData.transaction_code}</p>
          <p>Status: {decodedData.status}</p>
          <p>Total Amount: {decodedData.total_amount}</p>
          <p>Transaction UUID: {decodedData.transaction_uuid}</p>
          <p>Product Code: {decodedData.product_code}</p>
        </div>
      ) : (
        <p>No payment data found.</p>
      )}
      {/* Add a button to navigate to /viewcart */}
      <button onClick={() => navigate("/viewcart")} style={{ marginTop: "20px" }}>
        View Order
      </button>
    </div>
  );
};

export default Success;