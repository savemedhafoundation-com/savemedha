import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload || "home";
    },
  },
});

export const { setCurrentPage } = navigationSlice.actions;
export default navigationSlice.reducer;
