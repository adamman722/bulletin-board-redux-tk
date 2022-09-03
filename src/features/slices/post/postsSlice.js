import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const localHost = " http://localhost:3030/posts";

// shortcut you can use crtl+d when you have many things needing to be edited so highlight then command
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const resp = await axios.get(localHost);
  return resp.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.post.push(action.payload);
      },

      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.post.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading...";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "Succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(Date(), { minutes: min++ }).toISOString();
          post.reaction = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
