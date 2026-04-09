import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedUser: null,
  transactions: [],
  analysis: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    selectUser: (state, action) => {
      state.selectedUser = action.payload.user;
      state.transactions = action.payload.transactions;
      state.analysis = action.payload.analysis;
    },

    updateUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsers, selectUser, updateUser } = adminSlice.actions;
export default adminSlice.reducer;