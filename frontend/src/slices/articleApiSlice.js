import { apiSlice } from "./apiSlice";

const ARTICLE_URL = "/articles";

export const articleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: (catid) => {
        if (catid) {
          return {
            url: `${ARTICLE_URL}/cat/${catid}`,
            method: "GET",
          };
        } else {
          return {
            url: `${ARTICLE_URL}/`,
            method: "GET",
          };
        }
      },
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),

    getAllArticlesByCategory: builder.query({
      query: (catid) => ({
        url: `${ARTICLE_URL}/cat/${catid}`,
        method: "GET",
      }),
      // providesTags: ["User"],
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Article", id })), "Article"]
          : ["Article"],
    }),

    createArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: arg.id },
      ],
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "GET",
        providesTags: ["Article"],
      }),
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetAllArticlesByCategoryQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
} = articleApiSlice;
