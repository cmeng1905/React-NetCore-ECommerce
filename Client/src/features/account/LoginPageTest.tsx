import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import requests from "../../api/request";

export default function LoginPageTest() {

    const [values, setValues] = useState({ username: "", password: "" });
    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(values);
        requests.Account.login(values).then(response => {
            console.log("Login successful:", response);
        }).catch(error => {
            console.error("Login failed:", error);
        });
    }

    function handleInputChange(e: any) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" component="h1" textAlign="center" mb={2}>Login</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        name="username"
                        onChange={handleInputChange}
                        value={values.username}
                        label="Enter username"
                        fullWidth required autoFocus sx={{ mb: 2 }} size="small" />
                    <TextField
                        name="password"
                        onChange={handleInputChange}
                        value={values.password}
                        label="Enter password"
                        fullWidth required type="password"
                        sx={{ mb: 2 }} size="small" />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container >
    )
}
