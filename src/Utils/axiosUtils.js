import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://scienda-backend.onrender.com",
});

export default axiosInstance;
