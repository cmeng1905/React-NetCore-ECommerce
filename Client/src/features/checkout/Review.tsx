import { Divider, Stack, Typography } from '@mui/material';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useFormContext } from 'react-hook-form';

export default function Review() {
    const { getValues } = useFormContext();
    return (
        <Stack spacing={2} sx={{ mb: 2 }}>
            <Stack direction="column" divider={<Divider />} spacing={2} sx={{ my: 2 }}>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <DeliveryDiningIcon color='secondary' sx={{ mr: 1 }} /> Teslimat Bilgileri
                    </Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("firstName")} {getValues("lastName")}</Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("phone")}</Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("addressLine")} / {getValues("city")}</Typography>

                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PaymentsIcon color='secondary' sx={{ mr: 1 }} /> Ödeme Bilgileri
                    </Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("card_name")}</Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("card_number")}</Typography>
                    <Typography color='text.secondary' gutterBottom>{getValues("card_expiry_date")}</Typography>
                </div>
            </Stack>
        </Stack>
    )
}
