import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/ttf/cart-item",
  }),
  endpoints: (builder) => ({
    saveCart: builder.mutation({
      query: (data) => ({
        url: `/create`,
        method: "POST",
        body: data,
      }),
    }),
    getCart: builder.query({
      query: () => `/account`,
    }),
  }),
});

export const { useSaveCartMutation, useGetCartQuery } = cartApi;
