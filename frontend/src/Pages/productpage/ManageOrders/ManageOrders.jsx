import React, { useState, useEffect } from "react";
import axios from "axios";
import SlideMenu from "../../../components/slidemenu";
import API_URL from "../../../config/apiconfig";
import CartModal from "../../../components/dialogModal/cartModel"; // Import the CartModal component
import "./manageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedOrderId(orderId);
    setSelectedNewStatus(newStatus);
    setModalMessage(
      `Are you sure you want to change the status to ${newStatus}?`
    );
    setIsConfirmationModalOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      await axios.put(`${API_URL}/api/orders`, {
        orderId: selectedOrderId,
        status: selectedNewStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId
            ? { ...order, orderStatus: selectedNewStatus }
            : order
        )
      );
      setModalMessage("Order status updated successfully!");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating order status:", error);
      setModalMessage("Failed to update order status.");
      setIsSuccessModalOpen(true);
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  const closeModals = () => {
    setIsConfirmationModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="manage-orders-container">
      <SlideMenu />
      <h1 className="header-title">Manage Orders</h1>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order Info</th>
                <th>Product Info</th>
                <th>Customer Info</th>
                <th>Address Info</th>
                <th>Payment Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <strong>Order No:</strong> {order.orderNumber} <br />
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item._id}>
                        <strong>{item.productId.name}</strong> - {item.quantity}{" "}
                        pcs <br />
                      </div>
                    ))}
                  </td>
                  <td>{order.userId.fullname}</td>
                  <td>
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    , {order.shippingAddress.state}, {order.shippingAddress.zip}
                  </td>
                  <td>
                    <strong>Mode:</strong> {order.paymentMode} <br />
                    <strong>Total:</strong> Rs {order.totalPrice}
                  </td>
                  <td>
                    <select
                      className={order.orderStatus.toLowerCase()}
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      {[
                        "pending",
                        "processing",
                        "shipped",
                        "delivered",
                        "canceled",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      <CartModal
        isOpen={isConfirmationModalOpen}
        onClose={closeModals}
        onConfirm={confirmStatusChange}
        title="Confirmation"
        message={modalMessage}
        confirmText="Yes"
        cancelText="No"
      />

      {/* Success/Failure Modal */}
      <CartModal
        isOpen={isSuccessModalOpen}
        onClose={closeModals}
        title={modalMessage.includes("successfully") ? "Success" : "Error"}
        message={modalMessage}
        cancelText="Close"
      />
    </div>
  );
};

export default ManageOrders;
