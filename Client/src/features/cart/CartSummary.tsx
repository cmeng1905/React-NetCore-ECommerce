import { TableCell, TableRow } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";

export default function CartSummary() {
    const { cart } = useCartContext();
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    return (
        <>
            <TableRow>
                <TableCell align="right" colSpan={5}>
                    <strong>Ara Toplam:</strong>
                </TableCell>
                <TableCell align="right">
                    <strong>{currencyTRY.format(subTotal)}</strong>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>
                    <strong>Vergi (%20) :</strong>
                </TableCell>
                <TableCell align="right">
                    <strong>{currencyTRY.format(tax)}</strong>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>
                    <strong>Toplam:</strong>
                </TableCell>
                <TableCell align="right">
                    <strong>{currencyTRY.format(subTotal + tax)}</strong>
                </TableCell>
            </TableRow>
        </>
    )
}
