import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setToken, logout } from "./authSlice";

//const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' });

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  //baseUrl: "https://rezahakimi-api.onrender.com/api",
  //method: "POST",
  prepareHeaders: (headers, { getState }) => {
    // this method should retrieve the token without a hook

    const uInfo = getState().auth.userInfo;
    //console.log(getState().auth.userInfo.accessToken);
    //console.log(uInfo.accessToken);
    if (uInfo && uInfo.accessToken) {
      headers.set("Authorization", `Bearer ${uInfo.accessToken}`);
    }
    return headers;
  },
  /* body: JSON.stringify({
      username: username,
      password: password
    }) */
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
  } else if (result.error && result.error.status === 403) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["MyApp", "User"],
  endpoints: (builder) => ({}),
});
