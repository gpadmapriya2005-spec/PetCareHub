
import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../redux/cartSlice";

import {
  Link
} from "react-router-dom";

import "../styles/cart.css";

function Cart() {

  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  const totalItems =
    items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const totalPrice =
    items.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  if (items.length === 0) {

    return (

      <div className="empty-cart">

        <i className="fas fa-shopping-cart"></i>

        <h2>
          Your Cart is Empty
        </h2>

        <p>
          Add some products for your pet!
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>

      </div>

    );
  }

  return (

    <div className="cart-page">

      <h1>
        Your Shopping Cart
      </h1>

      <div className="cart-container">

        {/* CART ITEMS */}

        <div className="cart-items">

          {items.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-details">

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.category}
                </p>

                <h4>
                  ₹{item.price}
                </h4>

                <div className="quantity">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(
                          item.id
                        )
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(
                          item.id
                        )
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromCart(
                        item.id
                      )
                    )
                  }
                >
                  <i className="fas fa-trash"></i>
                  Remove
                </button>

              </div>

            </div>

          ))}

          <button
            className="clear-cart"
            onClick={() =>
              dispatch(clearCart())
            }
          >
            Clear Cart
          </button>

        </div>


        {/* SUMMARY */}

        <div className="cart-summary">

          <h2>
            Cart Summary
          </h2>

          <div className="summary-row">
            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Subtotal
            </span>

            <span>
              ₹{totalPrice}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Delivery
            </span>

            <span>
              FREE
            </span>
          </div>

          <hr />

          <div className="total-row">
            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;