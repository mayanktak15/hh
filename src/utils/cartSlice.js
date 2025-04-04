import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.push(newItem);
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        }
    }
});

export const { setCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
