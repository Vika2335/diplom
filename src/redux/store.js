import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './postsApi';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});