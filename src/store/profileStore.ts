import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage/storage";
import { User } from "@/types";

interface AuthState {
  token?: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  date?: string;
  setDate?: (date: string) => void;
  selectedChannel?: string | null;
  setSelectedChannel?: (selectedChannel: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      return {
        user: null,
        channels: [],
        setUser: (user) => {
          set({ user });
        },
        token: null,
        setToken: (token) => {
          set({ token });
        },
        date: undefined,
        setDate: (date) => set({ date }),
        selectedChannel: null,
        setSelectedChannel: (selectedChannel) =>
          set({ selectedChannel }),
      };
    },
    {
      name: "auth",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
