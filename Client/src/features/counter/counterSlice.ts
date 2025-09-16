import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { state.value++ },
        decrement: (state) => { state.value-- },
        incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload },
        setInitialValue: (state, action: PayloadAction<number>) => { state.value = action.payload }
    }
})

export const { increment, decrement, incrementByAmount, setInitialValue } = counterSlice.actions

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
