import { Box, Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // track clicked card

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCardClick = (idx) => {
    setExpandedCard(expandedCard === idx ? null : idx); // toggle card
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #fdfbfb, #ebedee)', py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', textAlign: 'center' }}>
          📚 Top 50 Popular Books
        </Typography>

        <Grid container spacing={4}>
          {data.map((row, idx) => {
            const isExpanded = expandedCard === idx;
            return (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card
                  onClick={() => handleCardClick(idx)}
                  sx={{
                    height: isExpanded ? 550 : 400,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={row['image']}
                    alt={row['book-name']}
                    sx={{
                      height: isExpanded ? 400 : 200, // image doubles
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      transition: 'height 0.3s ease',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, fontSize: '1rem' }}>
                      {isExpanded
                        ? row['book-name']
                        : row['book-name']?.length > 20
                          ? row['book-name'].slice(0, 20) + '...'
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
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;


