import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../Services/api";

import "../styles/services.css";

const Services = () => {

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const getServices = async () => {

      try {

        const response = await API.get("/services");

        setServices(response.data);

      } catch (error) {

        console.log(error);

        setError(
          "Unable to connect to the server"
        );

      } finally {

        setLoading(false);

      }
    };

    getServices();

  }, []);

  return (
    <div className="services-page">

      {/* ================= HEADER ================= */}

      <section className="services-header">

        <h1>
          Our Pet Services
        </h1>

        <p>
          Professional care and services
          for your beloved pets.
        </p>

      </section>

      {/* ================= LOADING ================= */}

      {loading && (
        <p className="services-message">
          Loading services...
        </p>
      )}

      {/* ================= ERROR ================= */}

      {error && (
        <p className="services-error">
          {error}
        </p>
      )}

      {/* ================= SERVICES ================= */}

      <div className="services-container">

        {services.map((service) => (

          <div
            className="service-card"
            key={service.id}
          >

            {/* IMAGE */}

            <div className="service-image">

              <img
                src={service.image}
                alt={service.name}
              />

            </div>

            {/* CONTENT */}

            <div className="service-content">

              <h2>
                {service.name}
              </h2>

              <p className="service-description">
                {service.description}
              </p>

              <div className="service-info">

                <span>
                  <i className="fas fa-clock"></i>
                  {service.duration}
                </span>

                <span className="service-price">
                  ₹{service.price}
                </span>

              </div>

              <Link
                to={`/book-service/${service.id}`}
                className="book-btn"
              >

                <i className="fas fa-calendar-check"></i>

                Book Service

              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Services;