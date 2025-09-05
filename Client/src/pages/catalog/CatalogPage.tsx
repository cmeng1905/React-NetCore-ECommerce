import { useEffect, useState } from "react";
import type { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import { CircularProgress, Stack } from "@mui/material";
import requests from "../../api/request";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requests.Catalog.list()
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return (
        <Stack alignItems="center">
            <CircularProgress />
        </Stack>
    );
    return (
        <ProductList products={products} />
    )
}
