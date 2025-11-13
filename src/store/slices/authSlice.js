import { createSlice } from '@reduxjs/toolkit';

const savedUser = sessionStorage.getItem('docnova_user');
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('docnova_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('docnova_user');
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;