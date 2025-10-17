import { Grid, Paper } from '@mui/material'
import React from 'react'
import Info from './Info'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'

export default function ChekoutPage() {
    return (
        <Paper>
            <Grid container sx={{ p: 4 }}>
                <Grid size={4}>
                    <Info />
                </Grid>
                <Grid size={8}>
                    <AddressForm />
                    <PaymentForm />
                    <Review />
                </Grid>
            </Grid>
        </Paper>
    )
}
