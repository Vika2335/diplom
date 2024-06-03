import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const comment = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (build) => ({
    getCommentPosts: build.mutation({
      query: (postId) => ({
        url: `posts/comments/${postId}`,
        method: "GET",
      }),
    }),

    createComment: build.mutation({
      query: ({ postId, comment }) => ({
        url: "comments",
        method: "POST",
        body: { postId, comment },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    likeComment: build.mutation({
      query: (id) => ({
        url: `comments/${id}/likes`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    changeComment: build.mutation({
      query: ({postId, comment, id}) => ({
        url: `comments/${id}`,
        method: "PATCH",
        body: {comment, postId},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    deleteComment:build.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useGetCommentPostsMutation, useLikeCommentMutation, useChangeCommentMutation, useDeleteCommentMutation } = comment