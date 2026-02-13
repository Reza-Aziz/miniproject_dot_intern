import { createSlice } from '@reduxjs/toolkit';

// Helper: Load dari localStorage
const loadFromLocalStorage = () => {
  try {
    const users = localStorage.getItem('users');
    const currentUser = localStorage.getItem('currentUser');
    const lastScore = localStorage.getItem('lastScore');
    
    return {
      users: users ? JSON.parse(users) : [],
      currentUser: currentUser ? JSON.parse(currentUser) : null,
      lastScore: lastScore ? JSON.parse(lastScore) : null,
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      users: [],
      currentUser: null,
      lastScore: null,
    };
  }
};

const savedData = loadFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedData.currentUser,
    isAuthenticated: !!savedData.currentUser,
    users: savedData.users,
    lastScore: savedData.lastScore,
  },
  reducers: {
    register: (state, action) => {
      // Tambah user baru
      state.users.push(action.payload);
      
      // Simpan ke localStorage
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      
      // Simpan current user ke localStorage
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Hapus current user dari localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('lastScore');
    },
    
    saveScore: (state, action) => {
      state.lastScore = action.payload;
      
      // Simpan score ke localStorage
      localStorage.setItem('lastScore', JSON.stringify(action.payload));
    },
  },
});

export const { register, login, logout, saveScore } = authSlice.actions;
export default authSlice.reducer;