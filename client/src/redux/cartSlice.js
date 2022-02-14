import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        coupon: {},
        total: 0,
    },
    reducers: {
        updateCart: (state, action) => {
            state.products = action.payload.products;
            state.quantity = action.payload.quantity;
            state.coupon = action.payload.coupon;
            state.total = action.payload.total;
        },
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
        changeQuantityProduct: (state, action) => {
            const index = state.products.findIndex(
                (item) =>
                    item._id === action.payload._id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );
            if (Math.abs(action.payload.value) !== 1) {
                state.products[index].quantity = action.payload.value;
                state.total += action.payload.price * action.payload.value;
            } else {
                state.products[index].quantity += action.payload.value;
                state.total += action.payload.value * action.payload.price;
            }
        },
        applyDiscount: (state, action) => {
            state.coupon = action.payload;
        },
        clearCart: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.coupon = {};
        },
    },
});

export const { updateCart, addProduct, removeProduct, changeQuantityProduct, applyDiscount, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
