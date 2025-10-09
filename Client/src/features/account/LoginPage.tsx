import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm, type FieldValues } from "react-hook-form"
import requests from "../../api/request";
import type { ILoginModel } from "../../model/ILoginModel";
import { useAppDispatch } from "../../hooks/hooks";
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ILoginModel>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    async function submitForm(data: FieldValues) {
        // await requests.Account.login(data);
        const resultAction = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/catalog");
        }
    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5" component="h1" textAlign="center" mb={2}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        autoComplete="off"
                        {...register('username', {
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        })}
                        label="Enter username"
                        fullWidth required autoFocus sx={{ mb: 2 }} size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        autoComplete="off"
                        {...register('password', {
                            required: {
                                value: true,
                                message: "Password is required"
                            }, minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                        label="Enter password"
                        fullWidth required type="password"
                        sx={{ mb: 2 }} size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button loading={isSubmitting}
                        // disabled={!isValid}
                        type="submit" variant="contained"
                        fullWidth sx={{ mt: 1 }}>Login</Button>
                </Box>
            </Paper>
        </Container >
    )
}
