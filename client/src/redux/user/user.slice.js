import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloggedin: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      state.isloggedin = true;
      state.user = payload;
    },
    removeUser: (state, action) => {
      state.isloggedin = false;
      state.user = {};
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
