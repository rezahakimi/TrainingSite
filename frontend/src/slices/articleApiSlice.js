import { apiSlice } from "./apiSlice";

const ARTICLE_URL = "/articles";

export const articleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticlesWithSearch: builder.query({
      query: ({ catId, pageNumber, pageSize, search }) => {
        if (catId) {
          return {
            url: `${ARTICLE_URL}/cat/search/${catId}?page=${pageNumber}&pageSize=${pageSize}&search=${search}`,
            method: "GET",
          };
        } else {
          return {
            url: `${ARTICLE_URL}/search/?page=${pageNumber}&pageSize=${pageSize}&search=${search}`,
            //url: `${ARTICLE_URL}/`,
            method: "GET",
          };
        }
      },
      //providesTags: ["Article"],
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.articlesData.map(({ id }) => ({ type: "Article", id })),
              { type: "Article", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Article", id: "PARTIAL-LIST" }],
    }),
    getAllArticles: builder.query({
      query: ({ userId }) => {
        if (userId) {
          return {
            url: `${ARTICLE_URL}/?userid=${userId}`,
            method: "GET",
          };
        } else {
          return {
            url: `${ARTICLE_URL}/`,
            method: "GET",
          };
        }
      },
      providesTags: ["Article"],
      /* providesTags: (result, error, arg) => {
        console.log(
          result
            ? result.articlesData.map(({ id }) => ({ type: "Article", id }))
            : ["Article"]
        );
        return result.articlesData
          ? [
              ...result.articlesData.map(({ id }) => ({ type: "Article", id })),
              "Article",
            ]
          : ["Article"];
      }, */
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
      // invalidatesTags: ["Article"],
      invalidatesTags: (result, error, id) => [
        { type: "Article", id },
        { type: "Article", id: "PARTIAL-LIST" },
      ],
    }),
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}/`,
        method: "PATCH",
        body: data,
      }),
      /* invalidatesTags: (result, error, arg) => {
        console.log(arg.id);
        return [{ type: "Article", id: arg.id }];
      }, */
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
        query: (id) => `post/${id}`,
        invalidatesTags: ["Article"],
        //providesTags: (result, error, id) => [{ type: "Article", id }],
      }),
    }),
    iLikeArticle: builder.mutation({
      query: (data) => {
        let articleId = data.articleId;
        let userId = data.userId;
        return {
          url: `${ARTICLE_URL}/like/${articleId}`,
          method: "PATCH",
          body: { userId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: arg.id },
      ],
    }),
    iDisLikeArticle: builder.mutation({
      query: (data) => {
        let articleId = data.articleId;
        let userId = data.userId;
        return {
          url: `${ARTICLE_URL}/dislike/${articleId}`,
          method: "PATCH",
          body: { userId },
          //credentials: "include",
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: arg.id },
      ],
    }),
    getUserLikeArticle: builder.query({
      query: (data) => {
        let userid = data.userId;
        let articleid = data.articleId;
        return {
          url: `${ARTICLE_URL}/like/${articleid}/${userid}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetAllArticlesWithSearchQuery,
  useGetAllArticlesQuery,
  useGetAllArticlesByCategoryQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  useGetUserLikeArticleQuery,
  useILikeArticleMutation,
  useIDisLikeArticleMutation,
} = articleApiSlice;
