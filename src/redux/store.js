import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './postsApi';
import userReducer from './userSlice';
import { api } from './userAuthAPI'

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware, api.middleware),
});