import { createSlice } from '@reduxjs/toolkit'

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: 0,
  reducers: {
    setTotalPrice: (state, action) => {
      return action.payload;
    },
  },
})

export const { setTotalPrice } = totalPriceSlice.actions

export default totalPriceSlice.reducer
