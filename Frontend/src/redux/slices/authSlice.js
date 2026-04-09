import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  authToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.authToken = action.payload.authToken;
      state.isAuthenticated = true;
    },

    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.role = null;
      state.authToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;
export default authSlice.reducer;