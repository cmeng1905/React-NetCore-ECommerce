import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { IProduct } from "../../model/IProduct"
import { AddShoppingCart } from "@mui/icons-material"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/request";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";
interface Props {
    product: IProduct
}
export default function Product({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const { setCart } = useCartContext();
    function handleAddItem(productId: number) {
        setLoading(true);
        requests.Cart.addItem(productId)
            .then((cart) => {
                toast.success("Item added to cart");
                setCart(cart);
            })
            .catch((err) => {
                toast.error("Error adding item to cart");
            }).finally(() => {
                setLoading(false);
            });
    }
    return (
        <Card>
            <CardMedia component={Link} to={`/catalog/${product.id}`} sx={{ height: 140, backgroundSize: "contain" }} image={`http://localhost:5267/images/${product.imageUrl}`} />
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography gutterBottom variant="h6" color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {currencyTRY.format(product.price)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Button variant="outlined" size="small" startIcon={<AddShoppingCart />} color="success" onClick={() => handleAddItem(product.id)} loading={loading} loadingPosition="start">Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card>
    )
}