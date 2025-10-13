import { Typography, Box, TextField, InputAdornment, Grid, Card, CardMedia, CardContent, CardActions, Button, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import Slider from 'react-slick';

// react-slick için CSS dosyalarını import ediyoruz
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const bestSellers = [
        { id: 1, name: 'Şık Deri Ceket', price: '899.99 TL', image: 'http://localhost:5267/images/1.jpg' },
        { id: 2, name: 'Modern Kol Saati', price: '1,250.00 TL', image: 'http://localhost:5267/images/2.jpg' },
        { id: 3, name: 'Kablosuz Kulaklık', price: '450.50 TL', image: 'http://localhost:5267/images/3.jpg' },
        { id: 4, name: 'Spor Ayakkabı', price: '675.00 TL', image: 'http://localhost:5267/images/4.jpg' },
    ];

    return (
        <Box>
            {/* --- Slider --- */}
            <Slider {...sliderSettings}>
                <Box sx={{ display: 'flex !important', justifyContent: 'center' }}>
                    <img src="http://localhost:5267/images/1.jpg" alt="Slide 1" style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ display: 'flex !important', justifyContent: 'center' }}>
                    <img src="http://localhost:5267/images/2.jpg" alt="Slide 2" style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ display: 'flex !important', justifyContent: 'center' }}>
                    <img src="http://localhost:5267/images/3.jpg" alt="Slide 3" style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
                </Box>
            </Slider>

            {/* --- Arama Çubuğu --- */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '600px', borderRadius: '50px' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Ürün, marka veya kategori ara..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '50px' }
                        }}
                    />
                </Paper>
            </Box>

            {/* --- En Çok Satın Alınanlar --- */}
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                    En Çok Satın Alınanlar
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {bestSellers.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 250,
                                        objectFit: 'cover'
                                    }}
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h3">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                                    <Button size="small" variant="outlined">Detaylar</Button>
                                    <Button size="small" variant="contained">Sepete Ekle</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
