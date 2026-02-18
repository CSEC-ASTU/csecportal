/*   */
import { createSlice } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "cookies-next";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
}

// Read from cookies initially
let parsedUser: any = null;
const userCookie = getCookie("auth_user");
console.log(userCookie);
const tokenCookie = getCookie("auth_token");

try {
  if (typeof userCookie === "string") {
    parsedUser = JSON.parse(userCookie);
  }
} catch (e) {
  console.log(e);
  parsedUser = null;
}

const initialState: AuthState = {
  user: parsedUser,
  token: typeof tokenCookie === "string" ? tokenCookie : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      deleteCookie("auth_token", { path: "/" });
      deleteCookie("auth_user", { path: "/" });
    },
  },
});

export const { setUserData, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
