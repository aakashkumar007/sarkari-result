// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  status: 'idle', // idle, loading, succeeded, failed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setAuthentication, setStatus } = authSlice.actions;

export const checkAuthentication = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await axios.get('http://localhost:3000/api/users/check-auth', {
      withCredentials: true, // Adjust if needed
    });
    dispatch(setAuthentication(response.data.isAuthenticated));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setAuthentication(false));
    dispatch(setStatus('failed'));
  }
};

export default authSlice.reducer;
