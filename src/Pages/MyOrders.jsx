import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import API from "../services/api";

import "../styles/myorders.css";

const MyOrders = () => {

  const user = useSelector(
    (state) => state.auth.user
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {

    try {

      const response = await API.get(
        `/orders?userId=${user.id}`
      );

      setOrders(response.data.reverse());

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <h2 className="orders-loading">
        Loading orders...
      </h2>
    );
  }

  return (

    <div className="my-orders-page">

      <div className="orders-header">

        <h1>
          My Orders
        </h1>

        <p>
          Track and manage your PetCareHub orders
        </p>

      </div>

      {orders.length === 0 ? (

        <div className="no-orders">

          <i className="fas fa-box-open"></i>

          <h2>
            No Orders Found
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link to="/products">
            Start Shopping
          </Link>

        </div>

      ) : (

        <div className="orders-container">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-card-header">

                <div>
                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span className="order-status-badge">
                  {order.status}
                </span>

              </div>

              <div className="order-products">

                {order.items.map((item) => (

                  <div
                    className="ordered-product"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <div className="order-footer">

                <div>

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{order.totalAmount}
                  </strong>

                </div>

                <div>

                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyOrders;