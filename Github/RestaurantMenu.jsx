import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RestaurantStyles.css'; // Optional CSS styling

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const restaurantId = localStorage.getItem('restaurantId'); // stored during login
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/restaurant/${restaurantId}`);
        setMenuItems(res.data);
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };

    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const handleEdit = (id) => {
    navigate(`/restaurant/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="restaurant-menu-page">
      <h2>Your Menu</h2>
      <button className="add-btn" onClick={() => navigate('/restaurant/new')}>Add New Product</button>

      <div className="menu-items">
        {menuItems.length === 0 ? (
          <p>No items in menu yet.</p>
        ) : (
          menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              <img src={item.imageUrl} alt={item.name} className="menu-img" />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>₹{item.price}</strong></p>
                <button onClick={() => handleEdit(item._id)}>Edit</button>
                <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
