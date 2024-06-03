import { apiSlice } from "./apiSlice";

const USER_URL = "/users";

function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const userApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["User", "Friend"],
  endpoints: (builder) => ({
    getAllUsersWithSearch: builder.query({
      query: ({ pageNumber, pageSize, search, displayType }) => {
        return {
          url: `${USER_URL}/search/?page=${pageNumber}&pageSize=${pageSize}&search=${search}&displayType=${displayType}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.usresData.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "PARTIAL-LIST" },
            ]
          : [{ type: "User", id: "PARTIAL-LIST" }],
    }),
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
    getFriends: builder.query({
      query: (id) => ({
        url: `${USER_URL}/getfriends/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      providesTags: (result = [], error, arg) => [
        "Friend",
        ...result.map(({ id }) => ({ type: "Friend", id })),
      ],
    }),
    getRequestFriends: builder.query({
      query: (id) => ({
        url: `${USER_URL}/getrequestfriends/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      providesTags: (result = [], error, arg) => [
        "Friend",
        ...result.map(({ id }) => ({ type: "Friend", id })),
      ],
    }),
    requestFriend: builder.mutation({
      query: (data) => {
        let id = data.userId;
        let friendId = data.friendId;
        return {
          url: `${USER_URL}/requestFriend/${id}`,
          method: "PATCH",
          body: { friendId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Friend", id: arg.id }],
    }),
    acceptFriend: builder.mutation({
      query: (data) => {
        let id = data.userId;
        let friendId = data.friendId;
        return {
          url: `${USER_URL}/acceptFriend/${id}`,
          method: "PATCH",
          body: { friendId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Friend", id: arg.id }],
    }),
    removeFriend: builder.mutation({
      query: (data) => {
        let id = data.userId;
        let friendId = data.friendId;
        return {
          url: `${USER_URL}/rejectFriend/${id}`,
          method: "PATCH",
          body: { friendId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Friend", id: arg.id }],
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
  useGetAllUsersWithSearchQuery,
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useChangePasswordUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetAllRolesQuery,
  useGetFriendsQuery,
  useGetRequestFriendsQuery,
  useRequestFriendMutation,
  useAcceptFriendMutation,
  useRemoveFriendMutation,
} = userApiSlice;
