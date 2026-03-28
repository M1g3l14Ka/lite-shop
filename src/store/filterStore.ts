
import { create } from "zustand";


interface FilterStore {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}


export const useFilterStore = create<FilterStore>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query}),
}))