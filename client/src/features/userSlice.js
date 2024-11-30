
import { createSlice } from '@reduxjs/toolkit';
import api from '../axios/axios.js';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload; 
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload; 
    },
    logout(state) {
      state.userInfo = null; 
    },
  },
});

// Async action for logging out
export const logoutUser = () => async (dispatch) => {
  try {
      // Optionally call an API endpoint for logging out
      await api.post('/logout', {}, { // Assuming you have a logout endpoint
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });

      // Clear user info from state and local storage
      localStorage.removeItem('accessToken'); // Remove token from local storage
      dispatch(logout())
      // Optionally redirect to login page if using react-router-dom
      // You can use history.push('/login') or navigate('/login') if using hooks
  } catch (error) {
       console.log('An error occurred while logging out.');
       
  } finally {
    dispatch(logout())
  }
};

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;


export default userSlice.reducer;