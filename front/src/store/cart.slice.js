import { createSlice } from "@reduxjs/toolkit";
import { fromStorage, inStorage, removeStorage } from "../lib";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
    value: JSON.parse(`${fromStorage("cart") || "{}"}`),
    },
    reducers: {
        clearCart: (state) => {
        state.value = {};
        removeStorage("cart");
    },
    setCart: (state, action) => {
        let data = action.payload;

        if (data.id in state.value) {
        let qty = state.value[data.id].qty + data.qty;

        state.value = {
            ...state.value,
            [data.id]: {
            qty,
            price: data.price,
            total: qty * data.price,
            name: data.name,
            image: data.image,
            },
        };
        } else {
        state.value = {
            ...state.value,
            [data.id]: {
            qty: data.qty,
            price: data.price,
            total: data.qty * data.price,
            name: data.name,
            image: data.image,
            },
        };
        }
        inStorage("cart", JSON.stringify(state.value), true);
    },
    editCart: (state, action) => {
        let data = action.payload;

        state.value = {
        ...state.value,
        [data.id]: {
            ...state.value[data.id],
            qty: data.qty,
          total: data.qty * state.value[data.id].price,
        },
        };

        inStorage("cart", JSON.stringify(state.value), true);
    },

    removeCart: (state, action) => {
        let temp = {};

        for (let id in state.value) {
        if (id != action.payload.id) {
            temp = {
            ...temp,
            [id]: state.value[id],
            };
        }
        }

        if (Object.keys(temp).length) {
        state.value = temp;
        inStorage("cart", JSON.stringify(state.value), true);
        } else {
        state.value = {};
        removeStorage("cart");
        }
    },
    },
});

export default cartSlice.reducer;

export const { setCart, clearCart, editCart, removeCart } = cartSlice.actions;
