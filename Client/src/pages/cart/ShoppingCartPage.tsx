import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";

export default function ShoppingCartPage() {
    const { cart } = useCartContext();
    if (!cart || cart.cartItems.length === 0)
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