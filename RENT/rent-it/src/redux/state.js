// redux/state.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  listings: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      // Log the action payload to verify data

      state.user = action.payload.user;
      state.token = action.payload.token;
      // console.log("ID:", state.user._id);
      // console.log("token:", state.token);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings
    }
  },
});

export const { setLogin, setLogout, setListings } = userSlice.actions;

export default userSlice.reducer;
