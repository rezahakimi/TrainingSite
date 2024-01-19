import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

//const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' });
const baseQuery = fetchBaseQuery({
  baseUrl: "https://rezahakimi-api.onrender.com/api",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["MyApp", "User"],
  endpoints: (builder) => ({}),
});
