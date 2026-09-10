import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";

import "../styles/nav.css";

const Nav = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Cart
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // Authentication
  const user = useSelector(
    (state) => state.auth.user
  );

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const handleLogout = () => {

    dispatch(logout());

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">

        <Link to="/">

          <i className="fas fa-paw"></i>

          <span>
            PETCAREHUB
          </span>

        </Link>

      </div>

      {/* NAV LINKS */}

      <div className="nav-links">

        <Link to="/">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>

        <Link to="/products">
          <i className="fas fa-shopping-bag"></i>
          <span>Products</span>
        </Link>

        <Link to="/services">
          <i className="fas fa-hand-holding-heart"></i>
          <span>Services</span>
        </Link>

        <Link to="/my-pets">
          <i className="fas fa-dog"></i>
          <span>My Pets</span>
        </Link>

        {/* CART */}

        <Link
          to="/cart"
          className="cart-link"
        >

          <i className="fas fa-shopping-cart"></i>

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>

        {/* AUTH */}

        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>

            <Link to="/register">
              <i className="fas fa-user-plus"></i>
              <span>Register</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <i className="fas fa-user"></i>

              <span>
                {user?.name}
              </span>
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </>
        )}

      </div>

    </nav>
  );
};

export default Nav;