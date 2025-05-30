import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import axios from 'axios';

function Recommendation() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  const handleCardClick = (idx) => {
    setExpandedCard((prev) => (prev === idx ? null : idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a book name.");
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/recommend_books', {
        user_input: input,
      });

      if (!Array.isArray(res.data) || res.data.length === 0) {
        alert("No recommendations found. Try a different title.");
        setData([]);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      alert("Something went wrong while fetching recommendations.");
    }
  };

  return (
    <Box sx={{ m: 8 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          📚 Book Recommended
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="standard" sx={{ mb: 4 }}>
            <InputLabel htmlFor="search-input">Search</InputLabel>
            <Input
              id="search-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              }
            />
          </FormControl>

          <Box display="flex" justifyContent="center" mb={4}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>

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
                    image={row?.image || 'https://via.placeholder.com/150'}
                    alt={row?.['book-name'] || 'Book Cover'}
                    sx={{
                      height: isExpanded ? 400 : 200,
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      transition: 'height 0.3s ease',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 1, fontSize: '1rem' }}
                    >
                      {isExpanded
                        ? row?.['book-name']
                        : row?.['book-name']?.length > 20
                        ? row?.['book-name'].slice(0, 20) + '...'
                        : row?.['book-name']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {row?.author || 'Unknown'}
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



