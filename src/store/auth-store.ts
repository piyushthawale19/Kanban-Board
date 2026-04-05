import { create } from "zustand";
import { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("kanban-token", data.token);
      localStorage.setItem("kanban-user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Login failed",
        isLoading: false,
      });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      localStorage.setItem("kanban-token", data.token);
      localStorage.setItem("kanban-user", JSON.stringify(data.user));

      set({ user: data.user, token: data.token, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Registration failed",
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("kanban-token");
    localStorage.removeItem("kanban-user");
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),

  hydrate: () => {
    const token = localStorage.getItem("kanban-token");
    const userStr = localStorage.getItem("kanban-user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token });
      } catch {
        localStorage.removeItem("kanban-token");
        localStorage.removeItem("kanban-user");
      }
    }
  },
}));
