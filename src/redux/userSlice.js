import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  email: null,
  username: null,
  roles: null,
  withUs: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      const data = action.payload;
      state.accessToken = data.accessToken;
      state.email = data.email;
      state.username = data.username;
      state.roles = data.roles;
      state.withUs = data.withUs;
    },
    clearUser(state) {
      state.accessToken = null;
      state.email = null;
      state.username = null;
      state.roles = null;
    },
    updateUser(state, action) {
      const data = action.payload;
      state.accessToken = data.accessToken;
      state.email = data.email;
      state.username = data.username;
    },
  },
});

export const { setUsers, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;