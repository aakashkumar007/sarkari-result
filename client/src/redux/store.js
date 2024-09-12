// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/authSlice.js'


export const store = configureStore({
  reducer: {
    user: userReducer, // Add your reducers here
  },
});
