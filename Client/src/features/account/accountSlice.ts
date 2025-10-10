import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../model/IUser";
import requests from "../../api/request";
import type { FieldValues } from "react-hook-form";
import { router } from "../../router/routes";

interface AccountState {
    user: IUser | null
}

const initialState: AccountState = {
    user: null
}

export const loginUser = createAsyncThunk<IUser, FieldValues>(
    "account/login",
    async (data, { rejectWithValue }) => {
        try {
            const user = await requests.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return rejectWithValue({ error: error.data });
        }
    }
)

export const accountSlice = createSlice(
    {
        name: "account",
        initialState,
        reducers: {
            logout: (state) => {
                state.user = null;
                localStorage.removeItem("user");
                router.navigate("/login");
            },
            setUser: (state, action) => {
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        extraReducers: (builder => {
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
        })
    }
)

export const { logout, setUser } = accountSlice.actions;