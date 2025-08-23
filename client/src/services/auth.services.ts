import api from "../utils/api";
import { tokens } from "../utils/handleTokens";

export interface LoginData {
  credential: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      name: string;
      username: string;
      email: string;
      avatar?: {
        url: string;
        localPath: string;
      };
      isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post("/v1/auth/register", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post("/v1/auth/login", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/v1/auth/logout");
      tokens.clearTokens();
    } catch (error: any) {
      // Even if logout fails, clear tokens locally
      tokens.clearTokens();
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post("/v1/auth/refresh-token");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Token refresh failed");
    }
  }

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post("/v1/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Password reset request failed"
      );
    }
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post("/v1/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  }

  async getCurrentUser(): Promise<AuthResponse["data"]["user"]> {
    try {
      const response = await api.get("/v1/auth/me");
      return response.data.data.user;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get user data"
      );
    }
  }
}

export const authService = new AuthService();
