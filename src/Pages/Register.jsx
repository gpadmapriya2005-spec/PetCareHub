import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";
import "../styles/register.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.gender ||
      !formData.country ||
      !formData.password
    ) {
      setError("Please fill all the fields");
      return;
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    try {

      // Check whether email already exists
      const response = await API.get(
        `/users?email=${formData.email}`
      );

      if (response.data.length > 0) {
        setError("Email already registered");
        return;
      }

      // Register user
      await API.post("/users", formData);

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {

      console.log(error);

      setError(
        "Unable to connect to the server"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-box">

        <div className="register-icon">
          <i className="fas fa-user-plus"></i>
        </div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join PetCareHub today
        </p>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">

            <label>Name</label>

            <div className="input-box">
              <i className="fas fa-user"></i>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <div className="input-box">
              <i className="fas fa-envelope"></i>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Gender */}
          <div className="form-group">

            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">
                Select Gender
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

          {/* Country */}
          <div className="form-group">

            <label>Country</label>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">
                Select Country
              </option>

              <option value="India">
                India
              </option>

              <option value="USA">
                USA
              </option>

              <option value="UK">
                UK
              </option>

              <option value="Canada">
                Canada
              </option>
            </select>

          </div>

          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <div className="input-box">

              <i className="fas fa-lock"></i>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

          </div>

          <button
            type="submit"
            className="register-btn"
          >
            <i className="fas fa-user-plus"></i>
            Register
          </button>

        </form>

        <p className="login-link">

          Already have an account?

          <span onClick={() => navigate("/login")}>
            Login
          </span>

        </p>

      </div>

    </div>
  );
};

export default Register;