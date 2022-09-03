import { createSlice, nanoid } from "@reduxjs/toolkit";

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
  reducers: {
    postAdded: {
      reducer(state, action) {
        //we can push because we are using immerJS anywhere else we have to use the normal way to not mutate the state
        // state.push(action.payload);
        // state = [...state, action.payload];
      },
      // prepare can take in the action.payload and transforms it to what we want it to be then returns it to the reducer as a callback
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
