import { Typography, Container, Paper, Box, Grid, Avatar } from '@mui/material'

export default function AboutPage() {
    return (
        <Container component={Paper} sx={{ p: 4, mt: 4 }}>
            {/* <Counter /> */}
            <Typography gutterBottom variant="h3" component="h1" align="center">
                Hakkımızda
            </Typography>
            <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
                E-Ticaret dünyasına hoş geldiniz! En kaliteli ürünleri en uygun fiyatlarla sizlere sunmak için buradayız. Müşteri memnuniyeti bizim için her zaman önceliklidir.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Misyonumuz
                        </Typography>
                        <Typography variant="body1">
                            Teknolojinin gücünü kullanarak alışveriş deneyimini herkes için daha kolay, daha hızlı ve daha keyifli hale getirmek. Geniş ürün yelpazemiz ve güvenilir hizmet anlayışımızla hayatınıza değer katmayı hedefliyoruz.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Vizyonumuz
                        </Typography>
                        <Typography variant="body1">
                            Bölgenin lider e-ticaret platformu olmak ve yenilikçi çözümlerimizle global pazarda tanınan bir marka haline gelmek. Sürdürülebilirlik ve toplumsal sorumluluk bilinciyle hareket ederek geleceğe yatırım yapıyoruz.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Ekibimizle Tanışın
                </Typography>
                <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <Avatar
                            alt="Jane Doe"
                            src="/images/avatar/1.jpg" // Placeholder image
                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>Jane Doe</Typography>
                        <Typography variant="body2" color="text.secondary">CEO</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Avatar
                            alt="John Smith"
                            src="/images/avatar/2.jpg" // Placeholder image
                            sx={{ width: 100, height: 100, margin: '0 auto' }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>John Smith</Typography>
                        <Typography variant="body2" color="text.secondary">CTO</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
