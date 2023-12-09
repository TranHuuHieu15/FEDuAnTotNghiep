import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: data?.token
          ? `/api/ttf/auth/login?token=${data.token}`
          : "/api/ttf/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/ttf/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    Oauth2Google: builder.mutation({
      query: () => ({
        url: "/google",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useOauth2GoogleMutation,
} = authApi;
