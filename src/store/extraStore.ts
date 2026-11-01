
import { create } from "zustand";

interface ExtraState {
  likes: any[];
  setLikes: (likes: any[]) => void;
}

export const useExtraStore = create<ExtraState>((set) => ({
  likes: [],
  setLikes: (likes) => set({ likes }),
}));
