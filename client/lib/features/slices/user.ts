import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  role: string;
  division: string; 
}

const initialState: IUserState = {
  role: "President",
  division: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setDivision: (state, action: PayloadAction<string>) => {
      state.division = action.payload;
    },
  },
});

export const { setRole, setDivision } = userSlice.actions;
export default userSlice.reducer;
