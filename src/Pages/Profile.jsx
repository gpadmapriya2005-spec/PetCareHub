import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/profile.css";

const Profile = () => {

  const user = useSelector(
    (state) => state.auth.user
  );

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-icon">
          <i className="fas fa-user-circle"></i>
        </div>

        <h1>My Profile</h1>

        <div className="profile-details">

          <div className="profile-row">
            <strong>Name</strong>
            <span>{user?.name}</span>
          </div>

          <div className="profile-row">
            <strong>Email</strong>
            <span>{user?.email}</span>
          </div>

          <div className="profile-row">
            <strong>Gender</strong>
            <span>{user?.gender}</span>
          </div>

          <div className="profile-row">
            <strong>Country</strong>
            <span>{user?.country}</span>
          </div>

        </div>

        <div className="profile-actions">

          <Link to="/my-pets">
            <i className="fas fa-paw"></i>
            My Pets
          </Link>

          <Link to="/my-orders">
            <i className="fas fa-box"></i>
            My Orders
          </Link>

          <Link to="/my-bookings">
            <i className="fas fa-calendar-check"></i>
            My Bookings
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Profile;