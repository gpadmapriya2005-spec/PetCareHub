import axios from "axios";

// When deployed, VITE_API_URL can be set to an external backend URL if hosted separately.
// If not set, in production it defaults to "" (same-origin relative requests).
// In development, it defaults to http://localhost:3000.
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:3000");

const API = axios.create({
  baseURL: baseURL,
});

export default API;