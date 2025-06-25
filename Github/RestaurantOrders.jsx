import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestaurantStyles.css'; // Optional styling

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const restaurantId = localStorage.getItem('restaurantId'); // Assuming stored after login

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/restaurant/${restaurantId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching restaurant orders:', err);
      }
    };

    if (restaurantId) {
      fetchOrders();
    }
  }, [restaurantId]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <div className="restaurant-orders-page">
      <h2>Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customerName || 'N/A'}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
              <div className="status-actions">
                <button onClick={() => updateOrderStatus(order._id, 'Accepted')}>Accept</button>
                <button onClick={() => updateOrderStatus(order._id, 'In Preparation')}>Preparing</button>
                <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Delivered</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantOrders;
