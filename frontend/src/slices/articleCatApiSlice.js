import { apiSlice } from "./apiSlice";

const ARTICLECAT_URL = "/articlecats";

export const articleCatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticleCats: builder.query({
      query: () => ({
        url: `${ARTICLECAT_URL}/`,
        method: "GET",
      }),
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "ArticleCat", id })), "ArticleCat"]
          : ["ArticleCat"],
    }),
    createArticleCat: builder.mutation({
      query: (data) => ({
        url: `${ARTICLECAT_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ArticleCat"],
    }),
    updateArticleCat: builder.mutation({
      query: (data) => ({
        url: `${ARTICLECAT_URL}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ArticleCat"],
    }),
    deleteArticleCat: builder.mutation({
      query: (id) => ({
        url: `${ARTICLECAT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ArticleCat", id: arg.id },
      ],
    }),
    getArticleCatById: builder.query({
      query: (id) => ({
        url: `${ARTICLECAT_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllArticleCatsQuery,
  useCreateArticleCatMutation,
  useUpdateArticleCatMutation,
  useDeleteArticleCatMutation,
  useGetArticleCatByIdQuery,
} = articleCatApiSlice;
