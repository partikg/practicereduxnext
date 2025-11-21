import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
    },
});
