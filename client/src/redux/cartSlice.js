import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingIndex = state.products.findIndex(
                (item) =>
                    item._id === action.payload._id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );
            if (existingIndex >= 0) {
                state.products[existingIndex] = {
                    ...state.products[existingIndex],
                    ...action.payload,
                    quantity: state.products[existingIndex].quantity + action.payload.quantity,
                };
            } else {
                state.quantity += 1;
                state.products.push(action.payload);
            }
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            const existingIndex = state.products.findIndex(
                (item) =>
                    item._id === action.payload._id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );
            state.products.splice(existingIndex, 1);
            state.quantity -= 1;
            state.total -= action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
