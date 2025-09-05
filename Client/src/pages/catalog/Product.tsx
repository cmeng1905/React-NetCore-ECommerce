import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { IProduct } from "../../model/IProduct"
import { AddShoppingCart } from "@mui/icons-material"
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
interface Props {
    product: IProduct
}
export default function Product({ product }: Props) {
    return (
        <Card>
            <CardMedia component={Link} to={`/catalog/${product.id}`} sx={{ height: 140, backgroundSize: "contain" }} image={`http://localhost:5267/images/${product.imageUrl}`} />
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography gutterBottom variant="h6" color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {(product.price / 100).toFixed(2)} ₺
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Button variant="outlined" size="small" startIcon={<AddShoppingCart />} color="success">Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
            </CardActions>
        </Card>
    )
}