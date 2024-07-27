import { createSlice } from "@reduxjs/toolkit";

export const buySlice = createSlice({
  name: "buy",
  initialState: [],
  reducers: {
    addToBuy: (state, action) => {
      return action.payload;
    },
    removeFromBuy: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearCart: () => [],
  },
});

export const { addToBuy, removeFromBuy, clearCart } = buySlice.actions;

export default buySlice.reducer;