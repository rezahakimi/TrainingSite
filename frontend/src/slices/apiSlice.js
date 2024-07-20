import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

//const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' });
const baseQuery = fetchBaseQuery({
  baseUrl: "https://rezahakimi-api.onrender.com/api",
  prepareHeaders: (headers) => {
    // this method should retrieve the token without a hook
    //const token = getAccessToken();
    let uInfo = JSON.parse(localStorage.getItem("userInfo"));
    //console.log(uInfo.accessToken);
    if (uInfo && uInfo.accessToken) {
      headers.set("Authorization", `Bearer ${uInfo.accessToken}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["MyApp", "User"],
  endpoints: (builder) => ({}),
});
