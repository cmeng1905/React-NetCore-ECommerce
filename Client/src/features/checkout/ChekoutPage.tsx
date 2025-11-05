import { Box, Button, Grid, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { act, use, useState } from 'react'
import Info from './Info'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'
import { ChevronLeft, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'
import requests from '../../api/request'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { removeCart, setCart } from '../cart/CartSlice'
import { useNavigate } from 'react-router'

const steps = ["Teslimat Bilgileri", "Ödeme Bilgileri", "Sipariş Özeti"];
function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <PaymentForm />
        case 2:
            return <Review />
        default:
            throw new Error("Bilinmeyen bir step");
    }
}

export default function ChekoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();
    const [orderId, setOrderId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(state => state.cart);

    async function nextStep(data: FieldValues) {
        if (activeStep === 2) {
            setLoading(true);
            try {
                const response = await requests.Order.createOrder(data);
                setOrderId(response);
                dispatch(removeCart());
            } catch (error) {
                console.error(error);
                setError("Sipariş oluşturulurken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        }
        setActiveStep(activeStep + 1);
    }
    function backStep() {
        setActiveStep(activeStep - 1);
    }
    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid container sx={{ p: 4 }}>
                    {
                        activeStep !== steps.length &&
                        (
                            <Grid size={4} sx={{
                                borderRight: "1px solid #ccc",
                                p: 3,
                                borderColor: "divider"
                            }}>
                                <Info />
                            </Grid>
                        )
                    }
                    <Grid size={activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                                {
                                    steps.map((label, index) => {
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    })
                                }
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep == steps.length ? (
                                !error ? (
                                    <Stack spacing={2}>
                                        <Typography variant='h5'>Siparişiniz alınmıştır.</Typography>
                                        <Typography variant='body1' sx={{ color: "text.secondary" }}>Sipariş numaranız <strong>{orderId}.</strong>
                                            Siparişiniz onaylandığında size bir e-posta göndereceğiz.
                                        </Typography>
                                        <Button variant='contained' sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}>Siparişleri Listele</Button>
                                    </Stack>
                                ) : (
                                    <Stack spacing={2}>
                                        <Typography variant='h5'>Sipariş oluşturulamadı.({error})</Typography>
                                        <Typography variant='body1' sx={{ color: "text.secondary" }}>{error}</Typography>
                                        <Button variant='contained' sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }} onClick={() => {
                                            setActiveStep(0);
                                            methods.reset();
                                        }}>Tekrar Dene</Button>
                                    </Stack>
                                )
                            ) : (
                                <>
                                    <form onSubmit={methods.handleSubmit(nextStep)}>
                                        {getStepContent(activeStep)}
                                        <Box sx={[
                                            { display: "flex", mt: 2, mb: 2 },
                                            activeStep !== 0 ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }
                                        ]}>
                                            {
                                                activeStep !== 0 && <Button startIcon={<ChevronLeft />} variant='contained' onClick={backStep}>
                                                    Geri
                                                </Button>
                                            }
                                            <Button loading={loading} type='submit' startIcon={<ChevronRightRounded />} variant='contained'>
                                                {
                                                    activeStep == 2 ? "Siparişi Tamamla" : "İleri"
                                                }
                                            </Button>
                                        </Box>
                                    </form>
                                </>

                            )}

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </FormProvider>

    )
}
