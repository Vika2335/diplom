import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => 'posts'
    }),

    createPost: build.mutation({
      query: (body) => ({
        url: 'posts',
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
        method: 'POST',
        body: body,
      })
    }),

    getOnePost: build.query({
      query: (id) => `posts/${id}`
    }),

    getLikePosts: build.mutation({
      query: () => ({
        url: "posts/latest",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    changePostData: build.mutation({
      query: ({header, body, tags}, id) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: {header, body, tags, id},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  })
});

export const { useGetPostsQuery, useGetOnePostQuery, useCreatePostMutation, useGetLikePostsMutation, useChangePostDataMutation, } = postsApi;