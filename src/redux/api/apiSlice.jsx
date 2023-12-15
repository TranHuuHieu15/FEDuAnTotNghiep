import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/ttf",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result?.error?.originalStatus === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.userInfo;
      // store the new token
      api.dispatch(loginSuccess({ ...refreshResult.data }, ...user));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
