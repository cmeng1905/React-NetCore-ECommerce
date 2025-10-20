import { Grid, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import type { IAddressModel } from '../../model/IAddressModel';

export default function AddressForm() {
    const { register, formState: { errors } } = useFormContext<IAddressModel>();
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('firstName', {
                        required: {
                            value: true,
                            message: "First name is required"
                        }
                    })}
                    label="Enter first name"
                    fullWidth autoFocus sx={{ mb: 2 }} size="small"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('lastName', {
                        required: {
                            value: true,
                            message: "Last name is required"
                        }
                    })}
                    label="Enter last name"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('phone', {
                        required: {
                            value: true,
                            message: "Phone number is required"
                        }
                    })}
                    label="Enter phone number"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('city', {
                        required: {
                            value: true,
                            message: "City is required"
                        }
                    })}
                    label="Enter city"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                    autoComplete="off"
                    {...register('addressLine', {
                        required: {
                            value: true,
                            message: "Address line is required"
                        }
                    })}
                    multiline
                    rows={4}
                    label="Enter address line"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.addressLine}
                    helperText={errors.addressLine?.message}
                />
            </Grid>
        </Grid>
    )
}
