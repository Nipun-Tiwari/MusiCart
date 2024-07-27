// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice';
import buyReducer from './features/buy/buySlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        buy: buyReducer
    },
})
