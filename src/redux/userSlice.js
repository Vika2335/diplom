import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  username: null,
  roles: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      const data = action.payload;
      state.token = data.token;
      state.email = data.email;
      state.username = data.username;
      state.roles = data.roles;
    },
    clearUser(state) {
      state.token = null;
      state.email = null;
      state.username = null;
      state.roles = null;
    },
  },
});

export const { setUsers, clearUser } = userSlice.actions;

export default userSlice.reducer;