import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define category type based on our constants
type Category = {
  value: "all" | "events" | "sessions" | "users" | "venues";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface IGlobalSearch {
  category: Category["value"];
  searchTerm: string;
}

const initialState: IGlobalSearch = {
  category: "all",
  searchTerm: "",
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category["value"]>) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSearchTerm } = globalSearchSlice.actions;
export default globalSearchSlice.reducer;
