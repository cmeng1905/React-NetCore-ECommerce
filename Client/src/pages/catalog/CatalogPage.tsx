import { useEffect, useState } from "react";
import type { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import { CircularProgress } from "@mui/material";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5267/api/products")
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <CircularProgress />;
    return (
        <ProductList products={products} />
    )
}
