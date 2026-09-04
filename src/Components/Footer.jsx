import React from "react";
import { Link } from "react-router-dom";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">

          <h2>
            <i className="fas fa-paw"></i>
            PetCareHub
          </h2>

          <p>
            Your trusted destination for pet products
            and professional pet care services.
          </p>

        </div>

        <div className="footer-box">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>

        </div>

        <div className="footer-box">

          <h3>Customer</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart">Cart</Link>

        </div>

        <div className="footer-box">

          <h3>Contact</h3>

          <p>
            <i className="fas fa-envelope"></i>
            support@petcarehub.com
          </p>

          <p>
            <i className="fas fa-phone"></i>
            +91 98765 43210
          </p>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 PetCareHub. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;