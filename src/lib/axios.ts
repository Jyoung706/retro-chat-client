import axios from "axios";
import useAuthStore from "@/store/authStore";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (res) => {});

export default axios;
