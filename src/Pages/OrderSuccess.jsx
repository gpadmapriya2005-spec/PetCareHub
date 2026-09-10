import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import API from "../Services/api";

import "../styles/ordersuccess.css";

const OrderSuccess = () => {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getOrder = async () => {

      try {

        const response = await API.get(
          `/orders/${orderId}`
        );

        setOrder(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    getOrder();

  }, [orderId]);

  if (loading) {
    return (
      <h2 className="order-loading">
        Loading order...
      </h2>
    );
  }

  if (!order) {
    return (
      <div className="order-error">
        <h2>Order not found</h2>

        <Link to="/products">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (

    <div className="order-success-page">

      <div className="order-success-box">

        <div className="order-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping with PetCareHub.
        </p>

        <div className="order-info">

          <div>
            <span>Order ID</span>
            <strong>
              #{order.id}
            </strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>
              ₹{order.totalAmount}
            </strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>
              {order.paymentMethod}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="order-status">
              {order.status}
            </strong>
          </div>

        </div>

        <div className="order-success-buttons">

          <Link to="/my-orders">
            <i className="fas fa-box"></i>
            My Orders
          </Link>

          <Link to="/products">
            <i className="fas fa-shopping-bag"></i>
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;