import { Box, Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:5000')
    .then(res => setData(res.data))
    .catch(err => console.error(err));
}, []);


  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #fdfbfb, #ebedee)', py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', textAlign: 'center' }}>
          📚 Top 50 Popular Books
        </Typography>

        <Grid container spacing={4}>
          {data.map((row, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card
                sx={{
                  height: '80vh',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={row['image']}
                  alt={row['book-name']}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 , Width: '150px'}}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, fontSize: '1rem' }}>
                    {row['book-name']?.length > 40
                      ? row['book-name'].slice(0, 45) + '...'
                      : row['book-name']}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {row['author']}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Votes: {row['num-rating']}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: ⭐ {row['avg-rating'].toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;

