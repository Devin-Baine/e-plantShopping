import { createSlice } from '@reduxjs/toolkit';

// Redux Slice Holding Every Plant Currently Placed in the Shopping Cart
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Adds a Plant to the Cart or Raises the Quantity of an Existing Entry
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },

    // Deletes a Plant From the Cart Completely, Matched Against Its Name
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Overwrites the Quantity Recorded for a Plant Already in the Cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Action Creators Dispatched From ProductList and CartItem
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Reducer Registered Against the Cart Slice Inside store.js
export default CartSlice.reducer;
