import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appBar: {
    title: "Dashboard",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppBarTitle: (state, action) => {
      state.appBar.title = action.payload;
    },
  },
});

export const { setAppBarTitle } = appSlice.actions;
export default appSlice.reducer;
