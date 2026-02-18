import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminLinksState {
  activeSlug: string;
}

const initialState: AdminLinksState = {
  activeSlug: "members",
};

export const presidentLinkSlice = createSlice({
  name: "adminLinks",
  initialState,
  reducers: {
    setActiveSlug: (state, action: PayloadAction<string>) => {
      state.activeSlug = action.payload;
    },
  },
});

export const { setActiveSlug } = presidentLinkSlice.actions;
export default presidentLinkSlice.reducer;
