import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
