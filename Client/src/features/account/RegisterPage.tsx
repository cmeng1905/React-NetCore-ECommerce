import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useForm, type FieldValues } from 'react-hook-form';
import type { IRegisterModel } from '../../model/IRegisterModel';
import { registerUser } from './accountSlice';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../hooks/hooks';
import { toast } from 'react-toastify';
export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IRegisterModel>({
        defaultValues: {
            Name: '',
            UserName: '',
            Email: '',
            Password: ''
        }
    });
    async function submitForm(data: FieldValues) {
        await dispatch(registerUser(data)).then((res) => {
            if (registerUser.fulfilled.match(res)) {
                toast.success("Registration successful - you can now login");
                navigate("/login");
            }
            else {
                toast.error("Registration failed - please try again");
                reset();
            }
        });

    }
    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <PersonAddIcon />
                </Avatar>
                <Typography variant="h5" component="h1" textAlign="center" mb={2}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
                    <TextField
                        autoComplete="off"
                        {...register('Name', {
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })}
                        label="Enter name"
                        fullWidth required autoFocus sx={{ mb: 2 }} size="small"
                        error={!!errors.Name}
                        helperText={errors.Name?.message}
                    />
                    <TextField
                        autoComplete="off"
                        {...register('UserName', {
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        })}
                        label="Enter username"
                        fullWidth required autoFocus sx={{ mb: 2 }} size="small"
                        error={!!errors.UserName}
                        helperText={errors.UserName?.message}
                    />
                    <TextField
                        autoComplete="off"
                        {...register('Email', {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email is not valid"
                            }
                        })}
                        label="Enter email"
                        fullWidth required autoFocus sx={{ mb: 2 }} size="small"
                        error={!!errors.Email}
                        helperText={errors.Email?.message}
                    />
                    <TextField
                        autoComplete="off"
                        {...register('Password', {
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
                        error={!!errors.Password}
                        helperText={errors.Password?.message}
                    />
                    <Button loading={isSubmitting}
                        // disabled={!isValid}
                        type="submit" variant="contained"
                        fullWidth sx={{ mt: 1 }}>Register</Button>
                </Box>
            </Paper>
        </Container>
    )
}
