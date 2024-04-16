import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const like = createApi({
    reducerPath: 'like',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (build) => ({
			likePost: build.query({
				query(id) {
					return {
						url: `posts/${id}/like`,
						headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
					}
				}
			}),
    })
});

export const { useLikePostQuery } = like;