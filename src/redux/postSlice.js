import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: null,
  body: null,
  tags: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost(state, action) {
      const data = action.payload;
      state.header = data.header;
      state.body = data.body;
      state.tags = data.tags;
    },
  },
});

export const { updatePost } = postSlice.actions;

export default postSlice.reducer;