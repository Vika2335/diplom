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
    setPost(state, action) {
      const data = action.payload;
      state.header = data.header;
      state.body = data.body;
      state.tags = data.tags;
      state.id = data.id;
    },
    updatePost(state, action) {
      const data = action.payload;
      state.header = data.header;
      state.body = data.body;
      state.tags = data.tags;
    }
  },
});

export const { updatePost, setPost } = postSlice.actions;

export default postSlice.reducer;