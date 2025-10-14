import { Typography, Container, Paper, Box, Grid, TextField, Button } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

export default function ContactPage() {
    return (
        <Container component={Paper} sx={{ p: 4, mt: 4 }}>
            <Typography gutterBottom variant="h3" component="h1" align="center">
                Bize Ulaşın
            </Typography>
            <Typography variant="body1" paragraph align="center" sx={{ mb: 6 }}>
                Sorularınız, önerileriniz veya işbirliği talepleriniz için aşağıdaki formu doldurabilir veya iletişim bilgilerimizden bize ulaşabilirsiniz.
            </Typography>

            <Grid container spacing={6}>
                {/* Contact Information */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
                        İletişim Bilgileri
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="body1">
                            E-Ticaret A.Ş.<br />
                            Teknoloji Cad. No:1, 34000<br />
                            İstanbul, Türkiye
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Phone sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="body1">+90 (212) 123 45 67</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Email sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="body1">destek@e-ticaret.com</Typography>
                    </Box>
                </Grid>

                {/* Contact Form */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
                        Mesaj Gönderin
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField required fullWidth id="name" label="Adınız" name="name" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField required fullWidth id="email" label="E-posta Adresiniz" name="email" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField required fullWidth multiline rows={4} id="message" label="Mesajınız" name="message" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" variant="contained" size="large" fullWidth>Gönder</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
