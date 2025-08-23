import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { tokens } from "./handleTokens";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:8000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokens.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokens.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(
            `${
              import.meta.env.VITE_SERVER_URL || "http://localhost:8000/api"
            }/v1/auth/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              withCredentials: true,
            }
          );

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;
          tokens.setTokens({ accessToken, refreshToken: newRefreshToken });

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        tokens.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
