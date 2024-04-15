import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  username: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.token = action.payload;
      state.email = action.payload;
      state.username = action.payload;
    },
    clearUser(state) {
      state.token = null;
      state.email = null;
      state.username = null;
    },
  },
});

export const { setUsers, clearUser } = userSlice.actions;

export default userSlice.reducer;