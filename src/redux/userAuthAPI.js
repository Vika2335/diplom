import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
  endpoints: (build) => ({
    getMe: build.query({
      query() {
        return {
          url: "user/me",
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
      }
    })
  })
});

export const { useGetMeQuery } = api;