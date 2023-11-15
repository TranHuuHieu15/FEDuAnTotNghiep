import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: token, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log("start");
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      console.log("success");
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.success = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.success = false;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
