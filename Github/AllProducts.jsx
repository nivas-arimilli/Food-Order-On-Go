import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminStyles.css'; // Shared styles for admin components

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Optional: Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-products-page">
      <h2>All Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Restaurant</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th> {/* Optional Edit/Delete */}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.restaurantName}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  {/* Optional edit */}
                  {/* <Link to={`/edit-product/${product._id}`}>Edit</Link> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
