import { Likes } from "@/types/recientItem";
import { create } from "zustand";

interface ExtraState {
  likes: Likes[];
  setLikes: (likes: Likes[]) => void;
}

export const useExtraStore = create<ExtraState>((set) => ({
  likes: [],
  setLikes: (likes) => set({ likes }),
}));
