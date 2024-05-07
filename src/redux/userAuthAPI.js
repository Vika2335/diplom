import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
  endpoints: (build) => ({
    getMe: build.query({
      query() {
        return {
          url: "user/me",
          headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        }
      }
    }),

    authorization: build.mutation({
      query: ({ email, password }) => ({
          url: 'auth/login', 
          method: 'POST',
          body: { email, password },
      }),
    }),
    
    registration: build.mutation({
      query: ({ email, password, username }) => ({
          url: 'auth/registration', 
          method: 'POST',
          body: { email, password, username },
      })
    }),

    changeUserData: build.mutation({
      query: ({ email, username }) => ({
        url: 'user/newUserData',
        method: 'PATCH',
        body: {email, username},
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
      })
    })


  })
});

export const { useGetMeQuery, useAuthorizationMutation, useRegistrationMutation, useChangeUserDataMutation} = api;