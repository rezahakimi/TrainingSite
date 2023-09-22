import { apiSlice } from './apiSlice';

const USER_URL = '/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: 'GET',
      }),
      providesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    /* logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),*/
  }), 
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation

} = userApiSlice;