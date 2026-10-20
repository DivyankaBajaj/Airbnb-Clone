import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb-clone-hy9g.onrender.com/api", // Aapka Live Backend URL
});

export default api;