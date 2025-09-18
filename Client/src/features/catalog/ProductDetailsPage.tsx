import { Button, CircularProgress, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IProduct } from "../../model/IProduct";
import requests from "../../api/request";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, setCart } from "../cart/CartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";


export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    // const [product, setProduct] = useState<IProduct | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [isAdded, setIsAdded] = useState(false);
    // const { cart, setCart } = useCartContext();
    const { cart, status } = useAppSelector(state => state.cart);
    const product = useAppSelector(state => selectProductById(state, Number(id)));
    const dispatch = useAppDispatch();
    useEffect(() => {
        // id && requests.Catalog.details(parseInt(id))
        //     .then(data => setProduct(data))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))
        !product && id && dispatch(fetchProductById(parseInt(id)));
    }, [id]);

    if (status === "pendingFetchProductById")
        return (
            <Stack alignItems="center">
                <CircularProgress />
            </Stack>
        );
    if (!product)
        return <h5>Product not found...</h5>

    const item = cart?.cartItems.find(i => i.productId == product.id);
    // function handleAddItem(productId: number) {
    //     setIsAdded(true);
    //     requests.Cart.addItem(productId)
    //         .then(cart => {
    //             dispatch(setCart(cart));
    //             toast.success("Item added to cart");
    //         })
    //         .catch(() => toast.error("Error adding item to cart"))
    //         .finally(() => setIsAdded(false));
    // }

    return (
        <>
            <Button variant="outlined" component={Link} to="/catalog" startIcon={<ArrowBack />} sx={{ textTransform: "none" }}>
                Catalog List
            </Button>
            <Grid container spacing={6}>
                <Grid size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
                    <img src={`http://localhost:5267/images/${product.imageUrl}`} alt={product.name} style={{ width: "100%" }} />
                </Grid>
                <Grid size={{ xl: 9, lg: 9, md: 7, sm: 6, xs: 12 }}>
                    <Typography variant="h3">{product.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h4" color="secondary"> {currencyTRY.format(product.price)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" sx={{ mt: 3 }} alignItems="center" spacing={2}>
                        <Button variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart />} loading={status === "pendingAddItem" + product.id}
                            onClick={() => dispatch(addItemToCart({ productId: product.id }))}>Add to Cart</Button>
                        {
                            item?.quantity! > 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    Sepetinize {item?.quantity} adet ürün eklenmiştir.
                                </Typography>
                            )
                        }
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}
