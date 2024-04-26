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
    
    authorization: build.mutation({
      query: ({ email, password }) => ({
          url: '/auth/login', 
          method: 'POST',
          body: { email, password },
      }),
    }),
    
    registration: build.mutation({
      query: ({ email, password, username }) => ({
          url: '/auth/registration', 
          method: 'POST',
          body: { email, password, username },
      })
    }),
  })
});

export const { useGetPostsQuery, useGetOnePostQuery, useAuthorizationMutation, useRegistrationMutation,  useCreatePostMutation} = postsApi;