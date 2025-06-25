import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/popular">Popular</Link>
      <Link to="/restaurants">All Restaurants</Link>
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user && (
        <>
          {user.role === 'customer' && <Link to="/cart">Cart</Link>}
          <span>Hi, {user.name}</span>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      )}
      {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
      {user && user.role === 'restaurant' && <Link to="/r-home">Restaurant</Link>}
    </nav>
  );
}
