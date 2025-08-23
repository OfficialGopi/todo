import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, AuthResponse } from "../services/auth.services";

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: {
    url: string;
    localPath: string;
  };
  isEmailVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credential: string, password: string) => Promise<void>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      login: async (credential: string, password: string) => {
        try {
          set({ isLoading: true });
          const response: AuthResponse = await authService.login({
            credential,
            password,
          });

          // Store tokens
          const { tokens } = await import("../utils/handleTokens");
          tokens.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });

          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (
        name: string,
        username: string,
        email: string,
        password: string
      ) => {
        try {
          set({ isLoading: true });
          const response: AuthResponse = await authService.register({
            name,
            username,
            email,
            password,
          });

          // Store tokens
          const { tokens } = await import("../utils/handleTokens");
          tokens.setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });

          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          // Even if logout fails, clear local state
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
