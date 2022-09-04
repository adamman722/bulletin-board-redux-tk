import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const localHosts = "http://localhost:3030/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const resp = await axios.get(localHosts);
  console.log(resp);
  return resp.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;

export const {} = userSlice.actions;

export default userSlice.reducer;
