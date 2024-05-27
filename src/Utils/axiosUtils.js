import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://scienda-backend.adaptable.app",
});

export default axiosInstance;
