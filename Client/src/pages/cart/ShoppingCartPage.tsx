import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import requests from "../../api/request";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartPage() {
    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({ loading: false, id: "" });
    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });
        requests.Cart.addItem(productId)
            .then((cart) => {
                setCart(cart);
                toast.success("Item added to cart");
            })
            .catch(() => toast.error("Error adding item to cart"))
            .finally(() => setStatus({ loading: false, id: "" }));
    }
    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
        requests.Cart.deleteItem(productId, quantity)
            .then((cart) => {
                setCart(cart);
                toast.success("Item removed from cart");
            })
            .catch(() => toast.error("Error removing item from cart"))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    if (cart == null || cart?.cartItems.length === 0)
        return (<Alert severity="error">Cart is empty</Alert>)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Fiyat</TableCell>
                        <TableCell align="center">Adet</TableCell>
                        <TableCell align="center">Toplam</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map((row) => (
                        <TableRow
                            key={row.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center" >
                                <img src={`http://localhost:5267/images/${row.imageUrl}`} alt={row.name} style={{ height: "60px" }} />
                            </TableCell>
                            <TableCell align="center">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{currencyTRY.format(row.price)}</TableCell>
                            <TableCell align="center">
                                <Button loading={status.loading && status.id === "add" + row.productId} onClick={() => handleAddItem(row.productId, "add" + row.productId)}>
                                    <AddCircleOutline />
                                </Button>
                                {row.quantity}
                                <Button loading={status.loading && status.id === "del" + row.productId} onClick={() => handleDeleteItem(row.productId, "del" + row.productId)}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                            <TableCell align="center">{currencyTRY.format(row.price * row.quantity)}</TableCell>
                            <TableCell align="center">
                                <Button loading={status.loading && status.id === "del_all" + row.productId} onClick={() => handleDeleteItem(row.productId, "del_all" + row.productId, row.quantity)}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <CartSummary />
                </TableBody>
            </Table>
        </TableContainer >
    )
}