import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantStyles.css'; // Optional CSS for styling

const RestaurantHome = () => {
  const navigate = useNavigate();

  const restaurantName = localStorage.getItem('restaurantName') || "Your Restaurant";

  return (
    <div className="restaurant-home">
      <h1>Welcome, {restaurantName}!</h1>
      <p>Manage your menu, track orders, and grow your business with ease.</p>

      <div className="restaurant-home-actions">
        <div className="action-card" onClick={() => navigate('/restaurant/menu')}>
          <h3>View Menu</h3>
          <p>Check, edit, or delete your food items</p>
        </div>

        <div className="action-card" onClick={() => navigate('/restaurant/orders')}>
          <h3>Manage Orders</h3>
          <p>Track and update incoming orders</p>
        </div>

        <div className="action-card" onClick={() => navigate('/restaurant/new')}>
          <h3>Add Product</h3>
          <p>Quickly add a new dish to your menu</p>
        </div>

        <div className="action-card" onClick={() => navigate('/restaurant/profile')}>
          <h3>Profile</h3>
          <p>View and edit your restaurant info</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHome;
