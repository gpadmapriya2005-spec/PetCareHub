import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import API from "../Services/api";
import { clearCart } from "../redux/cartSlice";

import "../styles/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/products");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        userName: formData.name,
        userEmail: formData.email,
        phone: formData.phone,

        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        items: cartItems,

        totalAmount: totalAmount,

        paymentMethod: "Cash on Delivery",

        status: "Placed",

        createdAt: new Date().toISOString()
      };

      const response = await API.post(
        "/orders",
        orderData
      );

      dispatch(clearCart());

      navigate(
        `/order-success/${response.data.id}`
      );

    } catch (error) {
      console.log(error);

      alert(
        "Unable to place order. Please try again."
      );
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* LEFT SIDE */}

        <div className="checkout-form-box">

          <h1>Checkout</h1>

          <p className="checkout-subtitle">
            Enter your delivery details
          </p>

          <form onSubmit={handleSubmit}>

            <div className="checkout-row">

              <div className="checkout-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="checkout-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="checkout-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="checkout-group">
              <label>Address</label>

              <textarea
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="checkout-row">

              <div className="checkout-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="checkout-group">
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="checkout-group">
              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="payment-method">

              <h3>Payment Method</h3>

              <div className="payment-option">

                <input
                  type="radio"
                  checked
                  readOnly
                />

                <i className="fas fa-money-bill-wave"></i>

                <span>
                  Cash on Delivery
                </span>

              </div>

            </div>

            <button
              type="submit"
              className="place-order-btn"
            >
              <i className="fas fa-shopping-bag"></i>

              Place Order
            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h3>{item.name}</h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

              </div>

              <strong>
                ₹
                {Number(item.price) *
                  item.quantity}
              </strong>

            </div>

          ))}

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;