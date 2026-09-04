import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import API from "../services/api";

import "../styles/mybookings.css";

const MyBookings = () => {

  const user = useSelector(
    (state) => state.auth.user
  );

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async () => {

    try {

      const response = await API.get(
        `/bookings?userId=${user.id}`
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    getBookings();

  }, []);

  const cancelBooking = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {

      await API.patch(`/bookings/${id}`, {
        status: "Cancelled"
      });

      alert("Booking cancelled successfully");

      getBookings();

    } catch (error) {

      console.log(error);

      alert("Unable to cancel booking");

    }
  };

  if (loading) {
    return (
      <h2 className="booking-loading">
        Loading bookings...
      </h2>
    );
  }

  return (

    <div className="my-bookings-page">

      <div className="bookings-header">

        <h1>My Bookings</h1>

        <p>
          Manage your pet service bookings
        </p>

      </div>

      {bookings.length === 0 ? (

        <div className="no-bookings">

          <i className="fas fa-calendar-times"></i>

          <h2>No Bookings Found</h2>

          <p>
            You haven't booked any pet services yet.
          </p>

          <Link to="/services">
            Browse Services
          </Link>

        </div>

      ) : (

        <div className="bookings-container">

          {bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking.id}
            >

              <div className="booking-card-header">

                <h2>
                  {booking.serviceName}
                </h2>

                <span
                  className={
                    booking.status === "Cancelled"
                      ? "status cancelled"
                      : "status confirmed"
                  }
                >
                  {booking.status}
                </span>

              </div>

              <div className="booking-info">

                <div>
                  <i className="fas fa-paw"></i>
                  <span>Pet Name</span>
                  <strong>{booking.petName}</strong>
                </div>

                <div>
                  <i className="fas fa-calendar"></i>
                  <span>Date</span>
                  <strong>{booking.date}</strong>
                </div>

                <div>
                  <i className="fas fa-clock"></i>
                  <span>Time</span>
                  <strong>{booking.time}</strong>
                </div>

                <div>
                  <i className="fas fa-rupee-sign"></i>
                  <span>Price</span>
                  <strong>₹{booking.price}</strong>
                </div>

              </div>

              {booking.notes && (

                <div className="booking-notes">

                  <strong>Notes:</strong>

                  <p>{booking.notes}</p>

                </div>

              )}

              {booking.status !== "Cancelled" && (

                <div className="booking-actions">

                  <Link
                    to={`/reschedule-booking/${booking.id}`}
                    className="reschedule-btn"
                  >
                    <i className="fas fa-calendar-alt"></i>
                    Reschedule
                  </Link>

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelBooking(booking.id)
                    }
                  >
                    <i className="fas fa-times"></i>
                    Cancel
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyBookings;