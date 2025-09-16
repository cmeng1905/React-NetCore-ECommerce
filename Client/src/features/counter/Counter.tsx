import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment, incrementByAmount, setInitialValue, useAppDispatch, useAppSelector } from "./counterSlice";
import { useEffect } from "react";

export default function Counter() {
    // const count = useSelector((state: RootState) => state.counter.value);
    // const dispatch = useDispatch<AppDispatch>();
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setInitialValue(0));
    }, []);
    return (
        <>
            <Typography>{count}</Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(5))}>Increment by Amount</Button>
            </ButtonGroup >
        </>
    )
}
