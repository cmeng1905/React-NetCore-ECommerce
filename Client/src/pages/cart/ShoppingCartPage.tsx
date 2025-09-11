import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import requests from "../../api/request";

export default function ShoppingCartPage() {
    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({ loading: false, id: "" });
    function handleAddItem(productId: number, id: string) {
        setStatus({ loading: true, id: id });
        requests.Cart.addItem(productId)
            .then((cart) => setCart(cart))
            .catch((err) => console.log(err))
            .finally(() => setStatus({ loading: false, id: "" }));
    }
    function handleDeleteItem(productId: number, id: string, quantity = 1) {
        setStatus({ loading: true, id: id });
        requests.Cart.deleteItem(productId, quantity)
            .then((cart) => setCart(cart))
            .catch((err) => console.log(err))
            .finally(() => setStatus({ loading: false, id: "" }));
    }

    if (cart == null || cart?.cartItems.length === 0)
        return (<Alert severity="error">Cart is empty</Alert>)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Fiyat</TableCell>
                        <TableCell align="right">Adet</TableCell>
                        <TableCell align="right">Toplam</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.cartItems.map((row) => (
                        <TableRow
                            key={row.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img src={`http://localhost:5267/images/${row.imageUrl}`} alt={row.name} style={{ height: "60px" }} />
                            </TableCell>
                            <TableCell align="right">{row.price} ₺</TableCell>
                            <TableCell align="right">
                                <Button loading={status.loading && status.id === "add" + row.productId} onClick={() => handleAddItem(row.productId, "add" + row.productId)}>
                                    <AddCircleOutline />
                                </Button>
                                {row.quantity}
                                <Button loading={status.loading && status.id === "del" + row.productId} onClick={() => handleDeleteItem(row.productId, "del" + row.productId)}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                            <TableCell align="right">{(row.price * row.quantity).toFixed(2)} ₺</TableCell>
                            <TableCell align="right">
                                <Button loading={status.loading && status.id === "del_all" + row.productId} onClick={() => handleDeleteItem(row.productId, "del_all" + row.productId, row.quantity)}>
                                    <RemoveCircleOutline />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}