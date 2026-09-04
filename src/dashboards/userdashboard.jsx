import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/userDashboard.css";

function UserDashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="user-dashboard">
      <div className="dashboard-welcome">
        <div>
          <p className="dashboard-tag">MY DASHBOARD</p>

          <h1>
            Welcome back, {user?.name} 👋
          </h1>

          <p>
            Manage your pets, appointments and pet care activities.
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-paw"></i>
          </div>

          <div>
            <p>My Pets</p>
            <h2>Manage</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-calendar-check"></i>
          </div>

          <div>
            <p>Appointments</p>
            <h2>Upcoming</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-heart"></i>
          </div>

          <div>
            <p>Pet Care</p>
            <h2>Healthy</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/my-pets" className="dashboard-action-card">
          <i className="fa-solid fa-dog"></i>

          <h3>My Pets</h3>

          <p>
            View, edit and manage all your pets.
          </p>

          <span>
            Manage Pets
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>

        <Link to="/add-pet" className="dashboard-action-card">
          <i className="fa-solid fa-plus"></i>

          <h3>Add New Pet</h3>

          <p>
            Add your pet's information to your account.
          </p>

          <span>
            Add Pet
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>

        <Link to="/services" className="dashboard-action-card">
          <i className="fa-solid fa-stethoscope"></i>

          <h3>Pet Services</h3>

          <p>
            Explore services designed for your pet.
          </p>

          <span>
            Explore Services
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;