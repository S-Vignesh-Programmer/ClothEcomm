import axios from "axios";

//  Use Vite env variable for API base
const API = import.meta.env.VITE_API_BASE_URL || "https://clothecomm.onrender.com/api";

//  Login
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/auth/login`, credentials);

  if (res.data.token) {
    // Store token in localStorage
    localStorage.setItem("token", res.data.token);
  }

  return res.data; // { token, user: { … } }
};

//  Register
export const registerUser = async (details) => {
  const res = await axios.post(`${API}/auth/signup`, details);
  return res.data; // { message: "User created", user: … }
};

//  Get Profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const res = await axios.get(`${API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // user object
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 401) {
      // token invalid/expired → cleanup
      localStorage.removeItem("token");
    }
    throw err;
  }
};
