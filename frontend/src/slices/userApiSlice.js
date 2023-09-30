import { apiSlice } from './apiSlice';

const USER_URL = '/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: 'GET',
      }),
     // providesTags: ["User"],
     providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ email }) => ({ type: 'User', email })), 'User']
          : ['User'],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: 'GET',
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
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery
} = userApiSlice;