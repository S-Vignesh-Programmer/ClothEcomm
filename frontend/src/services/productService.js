import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL+"/api";

export const getAllProducts = async (query = "") => {
  const res = await axios.get(`${API}/products?${query}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API}/products/${id}`);
  return res.data;
};
