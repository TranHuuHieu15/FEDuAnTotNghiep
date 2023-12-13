import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/ttf",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    console.log(error);
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    // Check if the error is due to an expired token
    if (error.response && error.response.status === 401) {
      // Make a request to refresh the token
      try {
        const response = await axios.post("/auth/refresh-token", refreshToken);
        const newAccessToken = response.data.accessToken;
        // Update the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh error, e.g., logout user
        console.error("Failed to refresh token:", refreshError);
        // Redirect to logout or handle in your app's way
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
