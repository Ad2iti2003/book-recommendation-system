// Contact.js
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/send_email', form);
      alert('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: { xs: 4, md: 8 }, bgcolor: '#f0f4ff' }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Image and form layout */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://cdn.dribbble.com/users/620666/screenshots/6117140/16_12_p2_4x.png"
            alt="Contact Us"
            sx={{
              width: '100%', maxWidth: 450, height: { xs: 250, md: 540 },
              borderRadius: 4, boxShadow: 3, objectFit: 'cover', mx: 'auto', display: 'block',
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: '#fff', borderRadius: 4, boxShadow: 4, minWidth:{xs:250, md:350}, mx: 'auto' }}>
            <Typography variant="h4" color="primary" sx={{ textAlign: 'center', mb: 3 }}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              {['name', 'email', 'phone', 'message'].map((field, idx) => (
                <Box sx={{ mb: 2 }} key={idx}>
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    multiline={field === 'message'}
                    rows={field === 'message' ? 4 : 1}
                    value={form[field]}
                    onChange={handleChange}
                    required
                  />
                </Box>
              ))}
              <Button variant="contained" color="primary" fullWidth type="submit">
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





