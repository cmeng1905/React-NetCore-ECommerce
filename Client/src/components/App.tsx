import Header from "./Header";
import { CircularProgress, Container, CssBaseline, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import requests from "../api/request";
import { useCartContext } from "../context/CartContext";
// import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.Cart.get()
      .then((cart) => {
        setCart(cart);
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
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
