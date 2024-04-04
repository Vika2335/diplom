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
                method: 'POST',
                body,
            })
        }),

        getOnePost: build.query({
            query: (id) => `posts/${id}`
        }),

        authorization: build.query({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            })
        })
    })
});

export const { useGetPostsQuery, useGetOnePostQuery } = postsApi;