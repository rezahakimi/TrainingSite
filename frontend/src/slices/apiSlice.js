import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setToken, logout } from "./authSlice";

//const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' });
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  //baseUrl: "https://rezahakimi-api.onrender.com/api",

  prepareHeaders: (headers) => {
    // this method should retrieve the token without a hook
    //const token = getAccessToken();
    let uInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(uInfo);
    //console.log(uInfo.accessToken);
    if (uInfo && uInfo.accessToken) {
      headers.set("Authorization", `Bearer ${uInfo.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      { url: "/auth/refreshtoken", method: "POST" },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setToken(refreshResult.data));
      // retry the initial query
      //console.log(refreshResult.data);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["MyApp", "User"],
  endpoints: (builder) => ({}),
});
