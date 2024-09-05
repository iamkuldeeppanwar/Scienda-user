import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userCount: 0,
    filteredUsers: 0,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    user_transactions: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.userCount = action.payload.userCount;
      state.filteredUsers = action.payload.filteredUsers;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user_transactions = action.payload.user_transactions;
    },
  },
});

export const { setUsers, setUser } = userSlice.actions;
export default userSlice.reducer;
