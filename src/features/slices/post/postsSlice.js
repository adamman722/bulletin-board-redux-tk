import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "Redux is such a fun topic",
  },
  {
    id: "2",
    title: "Slices...",
    content: "I can't wait for my pizza later....mmmmmmmmm pizzzaaaaaa",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;
