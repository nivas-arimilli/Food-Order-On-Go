import React from 'react';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>FoodieExpress</h3>
        <p>Delicious food delivered to your doorstep!</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/restaurants">Restaurants</a>
          <a href="/popular">Popular</a>
          <a href="/contact">Contact</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.</p>
      </div>
    </footer>
  );
}
