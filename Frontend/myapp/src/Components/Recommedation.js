import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';
import { SearchOffRounded } from '@mui/icons-material';

const sampleData = [
  {
    'book-name': 'Atomic Habits',
    'author': 'James Clear',
    'num-rating': 1200,
    'avg-rating': 4.6,
    'image': 'https://th.bing.com/th/id/OIP.40YdU1lR2EQdFRfSxnTERQHaHa?cb=iwp2&rs=1&pid=ImgDetMain',
  },
  // Add more sample objects as needed
];

function Recommendation() {
  const [expandedCard, setExpandedCard] = useState(null);
  const data = sampleData;

  const handleCardClick = (idx) => {
    setExpandedCard(prev => (prev === idx ? null : idx));
  };

  return (
    <Box sx={{ m: 8 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          📚 Book Recommendations
        </Typography>

        <FormControl fullWidth variant="standard" sx={{ mb: 4 }}>
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <Input
            id="search-input"
            endAdornment={
              <InputAdornment position="end">
                <SearchOffRounded />
              </InputAdornment>
            }
          />
        </FormControl>

        <Box display="flex" justifyContent="center" mb={4}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>

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
                    image={row.image}
                    alt={row['book-name']}
                    sx={{
                      height: isExpanded ? 400 : 200,
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
                      Author: {row.author}
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

export default Recommendation;

