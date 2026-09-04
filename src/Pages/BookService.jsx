import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useSelector } from "react-redux";

import API from "../Services/api";

import "../styles/bookservice.css";

const BookService = () => {

  const { serviceId } = useParams();

  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const [service, setService] = useState(null);

  const [formData, setFormData] = useState({
    petName: "",
    date: "",
    time: "",
    notes: ""
  });

  const [error, setError] = useState("");

  /* ================= GET SERVICE ================= */

  useEffect(() => {

    const getService = async () => {

      try {

        const response = await API.get(
          `/services/${serviceId}`
        );

        setService(response.data);

      } catch (error) {

        console.log(error);

        setError(
          "Unable to load service"
        );

      }
    };

    getService();

  }, [serviceId]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* ================= BOOK SERVICE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.petName ||
      !formData.date ||
      !formData.time
    ) {

      setError(
        "Please fill all required fields"
      );

      return;
    }

    try {

      const bookingData = {

        userId: user.id,

        userName: user.name,

        userEmail: user.email,

        serviceId: service.id,

        serviceName: service.name,

        price: service.price,

        petName: formData.petName,

        date: formData.date,

        time: formData.time,

        notes: formData.notes,

        status: "Confirmed",

        createdAt: new Date().toISOString()

      };

      const response = await API.post(
        "/bookings",
        bookingData
      );

      navigate(
        `/booking-success/${response.data.id}`
      );

    } catch (error) {

      console.log(error);

      setError(
        "Unable to book the service"
      );

    }
  };

  /* ================= LOADING ================= */

  if (!service && !error) {

    return (
      <div className="booking-message">
        Loading service...
      </div>
    );

  }

  if (error && !service) {

    return (
      <div className="booking-error">
        {error}
      </div>
    );

  }

  return (
    <div className="booking-page">

      <div className="booking-card">

        {/* ================= SERVICE ================= */}

        <div className="selected-service">

          <img
            src={service.image}
            alt={service.name}
          />

          <div>

            <h2>
              {service.name}
            </h2>

            <p>
              Duration: {service.duration}
            </p>

            <strong>
              ₹{service.price}
            </strong>

          </div>

        </div>

        <h1>
          Book This Service
        </h1>

        {error && (
          <p className="booking-form-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* PET NAME */}

          <div className="form-group">

            <label>
              Pet Name *
            </label>

            <input
              type="text"
              name="petName"
              placeholder="Enter your pet's name"
              value={formData.petName}
              onChange={handleChange}
            />

          </div>

          {/* DATE */}

          <div className="form-group">

            <label>
              Select Date *
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

          {/* TIME */}

          <div className="form-group">

            <label>
              Select Time *
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />

          </div>

          {/* NOTES */}

          <div className="form-group">

            <label>
              Additional Notes
            </label>

            <textarea
              name="notes"
              placeholder="Any special requirements..."
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="confirm-booking-btn"
          >

            <i className="fas fa-calendar-check"></i>

            Confirm Booking

          </button>

        </form>

      </div>

    </div>
  );
};

export default BookService;