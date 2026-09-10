import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import API from "../Services/api";

import "../styles/reschedulebooking.css";

const RescheduleBooking = () => {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getBooking = async () => {

      try {

        const response = await API.get(
          `/bookings/${bookingId}`
        );

        setBooking(response.data);

        setDate(response.data.date);
        setTime(response.data.time);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    getBooking();

  }, [bookingId]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!date || !time) {

      alert("Please select date and time");

      return;
    }

    try {

      await API.patch(
        `/bookings/${bookingId}`,
        {
          date: date,
          time: time,
          status: "Confirmed"
        }
      );

      alert(
        "Booking rescheduled successfully!"
      );

      navigate("/my-bookings");

    } catch (error) {

      console.log(error);

      alert(
        "Unable to reschedule booking"
      );

    }

  };

  if (loading) {

    return (
      <h2 className="reschedule-loading">
        Loading booking...
      </h2>
    );

  }

  if (!booking) {

    return (
      <div className="reschedule-error">
        <h2>Booking not found</h2>
      </div>
    );

  }

  return (

    <div className="reschedule-page">

      <div className="reschedule-box">

        <div className="reschedule-icon">
          <i className="fas fa-calendar-alt"></i>
        </div>

        <h1>Reschedule Booking</h1>

        <p>
          Update your booking date and time
        </p>

        <div className="service-name">
          <strong>Service:</strong>
          {booking.serviceName}
        </div>

        <div className="pet-name">
          <strong>Pet:</strong>
          {booking.petName}
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Select New Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Select New Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="update-booking-btn"
          >
            <i className="fas fa-save"></i>
            Update Booking
          </button>

        </form>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/my-bookings")
          }
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default RescheduleBooking;