import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import API from "../Services/api";

import "../styles/bookingsuccess.css";

const BookingSuccess = () => {

  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getBooking = async () => {

      try {

        const response = await API.get(
          `/bookings/${bookingId}`
        );

        setBooking(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    getBooking();

  }, [bookingId]);


  if (loading) {

    return (
      <div className="loading">
        <h2>Loading booking...</h2>
      </div>
    );

  }


  if (!booking) {

    return (
      <div className="booking-error">

        <h2>Booking not found</h2>

        <Link to="/services">
          Back to Services
        </Link>

      </div>
    );

  }


  return (

    <div className="booking-success-page">

      <div className="success-box">

        <div className="success-icon">

          <i className="fas fa-check-circle"></i>

        </div>


        <h1>
          Booking Successful!
        </h1>


        <p className="success-message">
          Your service has been booked successfully.
        </p>


        <div className="booking-details">

          <h2>
            Booking Details
          </h2>


          <div className="detail-row">

            <span>
              Booking ID
            </span>

            <strong>
              #{booking.id}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Service
            </span>

            <strong>
              {booking.serviceName}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Pet Name
            </span>

            <strong>
              {booking.petName}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Date
            </span>

            <strong>
              {booking.date}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Time
            </span>

            <strong>
              {booking.time}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Price
            </span>

            <strong>
              ₹{booking.price}
            </strong>

          </div>


          <div className="detail-row">

            <span>
              Status
            </span>

            <strong className="confirmed">
              {booking.status}
            </strong>

          </div>

        </div>


        <div className="success-buttons">

          <Link
            to="/my-bookings"
            className="view-bookings-btn"
          >

            <i className="fas fa-calendar-check"></i>

            View My Bookings

          </Link>


          <Link
            to="/services"
            className="services-btn"
          >

            <i className="fas fa-paw"></i>

            Book Another Service

          </Link>

        </div>

      </div>

    </div>

  );
};


// IMPORTANT
// Component name and export name must be identical.

export default BookingSuccess;