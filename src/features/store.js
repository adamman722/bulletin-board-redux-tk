import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post/postsSlice";
import userReducer from "./slices/users/userSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
  },
});
