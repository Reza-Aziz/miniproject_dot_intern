import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    users: [], // Simpen semua registered users
  },
  reducers: {
    register: (state, action) => {
      // Simpen user baru ke array users
      state.users.push(action.payload);
    },
    login: (state, action) => {
      // Set user yang login
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;