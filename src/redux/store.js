import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './postsApi';
import userReducer from './userSlice';
import { api } from './userAuthAPI'
import { like } from './likePost'
import { comment } from './commentPost'
import postReducer from './postSlice'

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        user: userReducer,
        [api.reducerPath]: api.reducer,
        [like.reducerPath]: like.reducer,
        [comment.reducerPath]: like.reducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware, api.middleware, like.middleware, comment.middleware),
});