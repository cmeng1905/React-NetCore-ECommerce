import { useEffect, useState } from "react"
import requests from "../../api/request";
import { CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { ICart } from "../../model/ICart";
import { Delete } from "@mui/icons-material";

export default function ShoppingCartPage() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<ICart | null>(null);
    useEffect(() => {
        requests.Cart.get()
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <Stack alignItems="center">
            <CircularProgress />
        </Stack>)

    if (!cart) return <div>Cart is empty</div>
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
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{(row.price * row.quantity).toFixed(2)} ₺</TableCell>
                            <TableCell align="right">
                                <IconButton color="error"><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}