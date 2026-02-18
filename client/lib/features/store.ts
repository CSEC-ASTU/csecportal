import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme";
import userSlice from "./slices/user";
import authSlice from "./slices/auth";
import eventSlice from "./slices/events";
import sessionSlice from "./slices/session";
import adminLinksSlice from "./slices/head-administration";
import presidentLinkSlice from "./slices/president-administration";
import globalSearchSlice from "./slices/global-search";
import { apiSlice } from "@/lib/features/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
      auth: authSlice,
      user: userSlice,
      pagination: eventSlice,
      sessions: sessionSlice,
      headAdminLinks: adminLinksSlice,
      presidentAdminLink: presidentLinkSlice,
      globalSearch: globalSearchSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
