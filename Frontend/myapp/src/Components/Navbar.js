import React from 'react';

import {AppBar,Box,Toolbar,Typography,Button,IconButton,useMediaQuery,useTheme,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="sticky" elevation={3} sx={{ backgroundColor: '#1e1e2f', px: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Logo or Brand Name */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #00c6ff, #0072ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📘 Books
        </Typography>

        {/* Mobile Menu Icon (optional placeholder) */}
        {isMobile ? (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Recommendation', to: '/reco' },
              { label: 'Contact', to: '/con' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '15px',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#0072ff',
                      color: '#fff',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
