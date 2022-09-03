import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Tony Stark" },
  { id: "1", name: "Bob Belcher" },
  { id: "2", name: "Joseph Joestar" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export const {} = userSlice.actions;

export default userSlice.reducer;
