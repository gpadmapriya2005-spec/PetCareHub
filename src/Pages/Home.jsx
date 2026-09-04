import React from "react";
import { Link } from "react-router-dom";

import "../styles/home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            <i className="fas fa-paw"></i>
            Welcome to PetCareHub
          </span>

          <h1>
            Everything Your Pet
            <br />
            Deserves ❤️
          </h1>

          <p>
            Shop premium pet products, book trusted services,
            and give your furry friends the love and care they deserve.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="primary-btn"
            >
              Shop Products
            </Link>

            <Link
              to="/services"
              className="secondary-btn"
            >
              Explore Services
            </Link>

          </div>

        </div>

        <div className="hero-image">

<img
  src="https://images.unsplash.com/photo-1507146426996-ef05306b995a"
  alt="Cute puppy portrait"
/>

</div>

      </section>
      <section className="about-section">

  <div className="about-image">

    <img
      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
      alt="Pet care"
    />

  </div>

  <div className="about-content">

    <span className="section-tag">
      ABOUT PETCAREHUB
    </span>

    <h2>
      We Care For Your
      <span> Furry Friends</span>
    </h2>

    <p>
      PetCareHub is an all-in-one platform designed to make
      pet care simple, convenient, and reliable. From quality
      pet products to professional pet care services, we bring
      everything your pet needs together in one place.
    </p>

    <p>
      Our goal is to help pet parents provide their pets with
      a happy, healthy, and comfortable life.
    </p>

    <div className="about-features">

      <div className="about-feature">
        <i className="fas fa-heart"></i>

        <div>
          <h3>Pet Friendly</h3>
          <p>Everything designed with pets in mind.</p>
        </div>
      </div>

      <div className="about-feature">
        <i className="fas fa-shield-alt"></i>

        <div>
          <h3>Trusted Quality</h3>
          <p>Reliable products and professional services.</p>
        </div>
      </div>

      <div className="about-feature">
        <i className="fas fa-headset"></i>

        <div>
          <h3>Easy Support</h3>
          <p>Simple and convenient pet care experience.</p>
        </div>
      </div>

      <div className="about-feature">
        <i className="fas fa-paw"></i>

        <div>
          <h3>Complete Care</h3>
          <p>Products and services under one platform.</p>
        </div>
      </div>

    </div>

    <Link
      to="/services"
      className="about-btn"
    >
      Discover More
      <i className="fas fa-arrow-right"></i>
    </Link>

  </div>

</section>
    </div>
  );
}

export default Home;