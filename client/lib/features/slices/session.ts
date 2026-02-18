import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionPaginationState {
  page: number;
  limit: number;
  search: string;
  sort: "asc" | "desc";
  total: number;
}

const initialState: SessionPaginationState = {
  page: 1,
  limit: 10,
  search: "",
  sort: "desc",
  total: 0,
};

const sessionSlice = createSlice({
  name: "sessionPagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sort = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    resetPagination: () => initialState,
  },
});

export const {
  setPage,
  setLimit,
  setSearch,
  setSort,
  setTotal,
  resetPagination,
} = sessionSlice.actions;

export default sessionSlice.reducer;
