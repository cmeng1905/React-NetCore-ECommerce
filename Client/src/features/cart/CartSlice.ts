import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICart } from "../../model/ICart";
import requests from "../../api/request";
import { act } from "react";

interface CartState {
    cart: ICart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
}

export const addItemToCart = createAsyncThunk<ICart, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({ productId, quantity = 1 }) => {
        try {
            const response = await requests.Cart.addItem(productId, quantity);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
);

export const deleteItemFromCart = createAsyncThunk<ICart, { productId: number, quantity?: number, key?: string }>(
    "cart/deleteItemFromCart",
    async ({ productId, quantity = 1 }) => {
        try {
            const response = await requests.Cart.deleteItem(productId, quantity);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            state.status = "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
        });
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = "idle";
        });
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        });
    }
});

export const { setCart } = cartSlice.actions;