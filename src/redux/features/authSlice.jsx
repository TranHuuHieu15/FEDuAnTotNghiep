import { createSlice } from "@reduxjs/toolkit";

const loadTokenToLocalStorage = () => {
  const token = localStorage.getItem("userToken");
  if (token !== undefined && token !== null) {
    return token;
  }
  return null;
};

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken: loadTokenToLocalStorage(), // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.success = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      localStorage.setItem("userToken", action.payload.userToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logout: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.success = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectCurrentToken = (state) => state.auth.userToken;
