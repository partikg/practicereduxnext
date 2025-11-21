import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },

    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const exists = state.cartItems.find(v => v.id === item.id);

            if (exists) {
                state.cartItems = state.cartItems.map(v =>
                    v.id === item.id ? { ...v, qty: v.qty + 1 } : v
                );
            } else {
                state.cartItems.push({ ...item, qty: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                v => v.id !== action.payload
            );
        },

        // ⭐ ADD QUANTITY
        increaseQty: (state, action) => {
            state.cartItems = state.cartItems.map(v =>
                v.id === action.payload ? { ...v, qty: v.qty + 1 } : v
            );
        },

        // ⭐ MINUS QUANTITY
        decreaseQty: (state, action) => {
            state.cartItems = state.cartItems.map(v =>
                v.id === action.payload && v.qty > 1
                    ? { ...v, qty: v.qty - 1 }
                    : v
            );
        },
    },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
