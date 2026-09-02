import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Global Redux Store Exposing the Cart Slice to Every Component
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
