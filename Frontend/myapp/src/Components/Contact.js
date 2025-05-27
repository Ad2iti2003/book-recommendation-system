import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

function Contact() {
  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 5, bgcolor: '#f0f4ff' }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://th.bing.com/th/id/OIP.T-yEY5SykAYSagyLQCtNlQHaGo?cb=iwp2&pid=ImgDet&w=191&h=170&c=7"
            alt="Contact Us"
            sx={{
              width: 100,
              borderRadius: 4,
              boxShadow: 3,
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Right Contact Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              bgcolor: '#ffffff',
              borderRadius: 4,
              boxShadow: 4,
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              Contact Us
            </Typography>

            <form noValidate autoComplete="off">
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact;



