import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/HomePage";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetailsPage from "../features/catalog/ProductDetailsPage";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import RegisterPage from "../features/account/RegisterPage";
import LoginPage from "../features/account/LoginPage";
import ChekoutPage from "../features/checkout/ChekoutPage";
import AuthGuard from "./AuthGuard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <AuthGuard />, children: [
                    {
                        path: "checkout",
                        element: <ChekoutPage />
                    }
                ]
            },
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "catalog",
                element: <CatalogPage />
            },
            {
                path: "error",
                element: <ErrorPage />
            },
            {
                path: "server-error",
                element: <ServerError />
            },
            {
                path: "not-found",
                element: <NotFound />
            },
            {
                path: "catalog/:id",
                element: <ProductDetailsPage />
            },
            {
                path: "cart",
                element: <ShoppingCartPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "*",
                element: <Navigate to="/not-found" />
            }
        ]
    }
])