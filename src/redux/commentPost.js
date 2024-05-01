import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const comment = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (build) => ({
    commentPost: build.mutation({
      query: (id) => ({
        url: `/posts/comments/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
})

export const { useCommentPostMutation } = comment;