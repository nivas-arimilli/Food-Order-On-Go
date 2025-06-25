import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminStyles.css'; // Reuse admin styles

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(res.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
      setRestaurants(restaurants.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="admin-restaurants-page">
      <h2>All Restaurants</h2>
      <table className="restaurants-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Owner</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant._id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.email}</td>
                <td>{restaurant.owner}</td>
                <td>{restaurant.phone || '-'}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No restaurants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllRestaurants;
