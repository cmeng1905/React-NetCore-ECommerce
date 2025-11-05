import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import type { ICartModel } from '../../model/ICardModel';

export default function PaymentForm() {
    const { register, formState: { errors } } = useFormContext<ICartModel>();
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('card_name', {
                        required: {
                            value: true,
                            message: "Card name name is required"
                        }
                    })}
                    label="Enter card name"
                    fullWidth autoFocus sx={{ mb: 2 }} size="small"
                    error={!!errors.card_name}
                    helperText={errors.card_name?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('card_number', {
                        required: {
                            value: true,
                            message: "Card number is required"
                        }
                    })}
                    label="Enter card number"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.card_number}
                    helperText={errors.card_number?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('card_expiry_date', {
                        required: {
                            value: true,
                            message: "Card expiry date is required"
                        }
                    })}
                    label="Enter card expiry date"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.card_expiry_date}
                    helperText={errors.card_expiry_date?.message}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    autoComplete="off"
                    {...register('card_cvv', {
                        required: {
                            value: true,
                            message: "CVV is required"
                        }
                    })}
                    label="Enter CVV"
                    fullWidth sx={{ mb: 2 }} size="small"
                    error={!!errors.card_cvv}
                    helperText={errors.card_cvv?.message}
                />
            </Grid>
        </Grid>
    )
}
