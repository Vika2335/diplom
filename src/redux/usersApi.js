import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (build) => ({
        authorization: build.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            })
        })
    })
});

export const { useAuthorizationQuery } = usersApi;