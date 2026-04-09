import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedUser: null,
  transactions: [],
  analysis: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // ================= COMMON ================= //

    adminStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    adminFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },

    // ================= USERS ================= //

    setUsers: (state, action) => {
      state.loading = false;
      state.users = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // ================= SINGLE USER ================= //

    selectUser: (state, action) => {
      state.loading = false;

      const { user, transactions, analysis } = action.payload || {};

      state.selectedUser = user || null;
      state.transactions = transactions || [];
      state.analysis = analysis || [];
    },

    // ================= UPDATE USER ================= //

    updateUser: (state, action) => {
      state.loading = false;

      const updatedUser = action.payload;

      if (!updatedUser) return;

      // update selected user
      state.selectedUser = updatedUser;

      // update in users list safely
      state.users = state.users.map((u) =>
        u._id === updatedUser._id ? updatedUser : u
      );
    },

    // ================= RESET ================= //

    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.transactions = [];
      state.analysis = [];
    },

    resetAdminState: () => initialState,
  },
});

export const {
  adminStart,
  adminFail,
  setUsers,
  selectUser,
  updateUser,
  clearSelectedUser,
  resetAdminState,
} = adminSlice.actions;

export default adminSlice.reducer;