import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post/postsSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
