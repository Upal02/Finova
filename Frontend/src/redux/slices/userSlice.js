import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  transactions: [],
  analysis: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    setUserData: (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
      state.transactions = action.payload.transactions;
      state.analysis = action.payload.analysis;
    },

    userFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userStart, setUserData, userFail } = userSlice.actions;
export default userSlice.reducer;