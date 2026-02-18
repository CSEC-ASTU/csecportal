// store/adminLinksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminLinksState {
  activeSlug: string;
}

const initialState: AdminLinksState = {
  activeSlug: "members", // default
};

export const adminLinksSlice = createSlice({
  name: "adminLinks",
  initialState,
  reducers: {
    setActiveSlug: (state, action: PayloadAction<string>) => {
      state.activeSlug = action.payload;
    },
  },
});

export const { setActiveSlug } = adminLinksSlice.actions;
export default adminLinksSlice.reducer;
