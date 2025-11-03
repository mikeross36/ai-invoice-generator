import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined");
}

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
axiosPrivate.defaults.headers.common["Content-Type"] = "application/json";

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;
    const errMsg = err.response?.data?.message || err.message;
    if (
      err.response?.status === 401 &&
      errMsg.includes("You are not logged in") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axiosPrivate(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default axiosPrivate;
