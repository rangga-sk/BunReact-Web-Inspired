import axios from "axios";

const api = axios.create({
  baseURL: window.__CONFIG__.API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

/* Response interceptor */
api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error);
},{ synchronous: true });

export default api;
