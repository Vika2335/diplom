import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const comment = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (build) => ({
    getCommentPosts: build.query({
      query: (id) => `posts/comments/${id}`
    }),

    createComment: build.mutation({
      query: ({ postId, comment }) => ({
        url: 'comments',
        method: "POST",
        body: {postId, comment},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useGetCommentPostsQuery } = comment;