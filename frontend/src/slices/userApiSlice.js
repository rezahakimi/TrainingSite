import { apiSlice } from "./apiSlice";

const USER_URL = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: "GET",
      }),
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ email }) => ({ type: "User", email })), "User"]
          : ["User"],
    }),
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/`,
          method: "POST",
          body: data,
          formData: true,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `${USER_URL}/`,
          method: "PATCH",
          body: data,
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),
    getAllRoles: builder.query({
      query: () => ({
        url: `${USER_URL}/roles`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    changePasswordUser: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/changepassword`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllFriends: builder.query({
      query: (id) => ({
        url: `${USER_URL}/friends/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    addFriend: builder.mutation({
      query: (data) => {
        let id = data.userId;
        let friendId = data.friendId;
        return {
          url: `${USER_URL}/Friends/${id}`,
          method: "POST",
          body: { friendId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: ["User"],
    }),
    removeFriend: builder.mutation({
      query: (data) => {
        let id = data.userId;
        let friendId = data.friendId;
        return {
          url: `${USER_URL}/Friends/${id}`,
          method: "DELETE",
          body: { friendId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: ["User"],
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
  useChangePasswordUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetAllRolesQuery,
  useGetAllFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = userApiSlice;
