import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const like = createApi({
  reducerPath: "like",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (build) => ({
    likePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}/like`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
})

export const { useLikePostMutation } = like;