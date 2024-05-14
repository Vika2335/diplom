import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: null,
  body: null,
  tags: null,
  id: null,
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
    deletePost(state, action) {
      const data = action.payload;
      state.header = data.null;
      state.body = data.null;
      state.tags = data.null;
    }
  },
});

export const { updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;