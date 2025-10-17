import { Box, Button, Grid, Paper, Step, StepLabel, Stepper } from '@mui/material'
import React, { act, use, useState } from 'react'
import Info from './Info'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { get, set } from 'react-hook-form'
import { ChevronLeft, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material'

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
    function nextStep() {
        setActiveStep(activeStep + 1);
    }
    function backStep() {
        setActiveStep(activeStep - 1);
    }
    return (
        <Paper>
            <Grid container sx={{ p: 4 }}>
                <Grid size={4}>
                    <Info />
                </Grid>
                <Grid size={8}>
                    <Box>
                        <Stepper activeStep={activeStep} sx={{ height: 40 }}>
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
                            <>
                                <h2>Sipariş tamamlandı.</h2>
                            </>
                        ) : (
                            <>
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
                                    <Button startIcon={<ChevronRightRounded />} variant='contained' onClick={nextStep}>
                                        İleri
                                    </Button>
                                </Box>
                            </>

                        )}

                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
