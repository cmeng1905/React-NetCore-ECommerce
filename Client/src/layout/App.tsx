import { CircularProgress, Container, CssBaseline, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import requests from "../api/request";
import { useCartContext } from "../context/CartContext";
import { useAppDispatch } from "../hooks/hooks";
import { getCart, setCart } from "../features/cart/CartSlice";
import { getUser, logout, setUser } from "../features/account/accountSlice";
import Header from "./Header";

function App() {
  // const { setCart } = useCartContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = async () => {
    //getCart
    //getUser

    // requests.Account.getUser().then((user) => {
    //   dispatch(setUser(user));
    // }).catch((error) => {
    //   dispatch(logout());
    // });

    // requests.Cart.get()
    //   .then((cart) => {
    //     // setCart(cart);
    //     dispatch(setCart(cart));
    //   })
    //   .catch((err) => {
    //     toast.error("Sepet bilgisine ulaşılamadı.");
    //   }).finally(() => {
    //     setLoading(false);
    //   });
    await dispatch(getUser());
    await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>)
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
