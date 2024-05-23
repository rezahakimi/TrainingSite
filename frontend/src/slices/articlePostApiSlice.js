import { apiSlice } from "./apiSlice";

const ARTICLEPOST_URL = "/articlecomments";

export const articlePostApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticlePostsByArticleId: builder.query({
      query: ({ articleId, accept }) => ({
        url: `${ARTICLEPOST_URL}/article/${articleId}/?accept=${accept}`,
        method: "GET",
      }),
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.articlePostsData.map(({ id }) => ({
                type: "ArticlePost",
                id,
              })),
              "ArticlePost",
            ]
          : ["ArticlePost"],
    }),
    getArticlePostById: builder.query({
      query: (id) => ({
        url: `${ARTICLEPOST_URL}/${id}`,
        method: "GET",
      }),
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ArticlePost", id })),
              "ArticlePost",
            ]
          : ["ArticlePost"],
    }),
    createArticlePost: builder.mutation({
      query: (data) => ({
        url: `${ARTICLEPOST_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ArticlePost"],
    }),
    updateArticlePost: builder.mutation({
      query: (data) => ({
        url: `${ARTICLEPOST_URL}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ArticlePost"],
    }),
  }),
});

export const {
  useGetAllArticlePostsByArticleIdQuery,
  useCreateArticlePostMutation,
  useUpdateArticlePostMutation,
  useGetArticlePostByIdQuery,
} = articlePostApiSlice;
