import { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useDispatch } from "react-redux";

import API from "../Services/api";
import { login } from "../redux/authSlice";

import "../styles/login.css";

const Login = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  // Get the page user originally wanted to visit
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Check empty fields
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {

      // Check user from JSON Server
      const response = await API.get(
        `/users?email=${email}&password=${password}`
      );

      // Invalid login
      if (response.data.length === 0) {

        setError("Invalid email or password");

        return;
      }

      // Get logged-in user
      const user = response.data[0];

      // Store user in Redux
      dispatch(login(user));

      // Success message
      alert(`Welcome ${user.name}!`);

      // Go back to originally requested page
      navigate(from, {
        replace: true
      });

    } catch (error) {

      console.log(error);

      setError(
        "Unable to connect to the server"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        {/* ================= ICON ================= */}

        <div className="login-icon">

          <i className="fas fa-sign-in-alt"></i>

        </div>

        {/* ================= HEADING ================= */}

        <h1>
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to your PetCareHub account
        </p>

        {/* ================= ERROR ================= */}

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <div className="input-box">

              <i className="fas fa-envelope"></i>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <div className="input-box">

              <i className="fas fa-lock"></i>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-btn"
          >

            <i className="fas fa-sign-in-alt"></i>

            Login

          </button>

        </form>

        {/* ================= REGISTER LINK ================= */}

        <p className="register-link">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
};

export default Login;