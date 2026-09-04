import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

import Services from "./Pages/Services";
import BookService from "./Pages/BookService";
import BookingSuccess from "./Pages/BookingSuccess";
import MyBookings from "./Pages/MyBookings";
import RescheduleBooking from "./Pages/RescheduleBooking";

import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrders";

import ProtectedRoute from "./components/ProtectedRoute";

function Allroutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/services" element={<Services />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book-service/:serviceId"
        element={
          <ProtectedRoute>
            <BookService />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking-success/:bookingId"
        element={
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reschedule-booking/:bookingId"
        element={
          <ProtectedRoute>
            <RescheduleBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success/:orderId"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default Allroutes;