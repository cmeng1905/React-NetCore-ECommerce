import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";

const links = [
    { title: "Home", to: "/" },
    { title: "Catalog", to: "/catalog" },
    { title: "About", to: "/about" },
    { title: "Contact", to: "/contact" },
    { title: "Error", to: "/error" },
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "text.primary"
    },
    "&.active": {
        color: "warning.main"
    }
}
function Header() {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">E-Commerce</Typography>
                    {/* <List sx={{ display: 'flex' }}>
                        {
                            links.map((link, index) =>
                                <ListItem key={index} component={NavLink} to={link.to} sx={navStyles}>{link.title}</ListItem>
                            )
                        }
                    </List> */}
                    <Stack direction="row" spacing={2}>
                        {
                            links.map((link, index) =>
                                <Button key={index} component={NavLink} to={link.to} sx={navStyles}>{link.title}</Button>
                            )
                        }
                    </Stack>
                </Box>
                <Box>
                    <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header