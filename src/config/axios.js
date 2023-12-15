import axios from "axios";
import { loginSuccess } from "../redux/features/authSlice";
import store from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/ttf",
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("response.data");
    return response.data;
  },
  async function (error) {
    console.log(error);
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    // Check if the error is due to an expired token
    if (error.code && error.code === "ERR_NETWORK") {
      // Make a request to refresh the token
      try {
        const response = await axios.post(
          "http://localhost:8080/api/ttf/auth/refresh-token",
          {
            refreshToken,
          }
        );
        const newAccessToken = response.data.data;
        const userInfo = store.getState().auth.userInfo;
        store.dispatch(
          loginSuccess({
            userInfo: userInfo,
            userToken: newAccessToken,
            refreshToken: refreshToken,
          })
        );
        // Update the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        // Handle refresh error, e.g., logout user
        console.error("Failed to refresh token:", refreshError);
        // Redirect to logout or handle in your app's way
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
